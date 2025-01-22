import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.text()

  const sig = request.headers.get('stripe-signature') as string

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  // Get the ID and type
  const eventType = event.type

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const { id, payment_intent } = event.data.object

    const { line_items } = await stripe.checkout.sessions.retrieve(
      id,
      {
        expand: ['line_items'],
      }
    );

    const session = event.data.object;
    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

    const { metadata } = paymentIntent;

    const buyerId = metadata?.buyerId ? parseInt(metadata.buyerId, 10) : null

    const order = {
      paymentId: payment_intent,
      userId: buyerId,
      createdAt: new Date(),
    }

    try {
      // Insert the order into the database using Prisma
      const newOrder = await prisma.order.create({
        data: order
      });

      const productIds = metadata.productIds.split(',');
      const orderProductsData = line_items.data.map((item, index) => ({
        orderId: newOrder.id,
        productId: parseInt(productIds[index]), // Assuming the product ID is available in the price object
        qty: item.quantity,
        price: parseFloat(item.amount_total / 100),
      }))

      // Insert all OrderProducts in a single transaction for better performance
      await prisma.orderProduct.createMany({
        data: orderProductsData,
      })


      return NextResponse.json({ message: 'Order created', order: newOrder })
    } catch (error) {
      console.error('Error inserting order:', error)
      return NextResponse.json({ message: 'Failed to create order', error: error.message })
    }
  }

  return new Response('', { status: 200 })
}