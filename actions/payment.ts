"use server"
import { Stripe } from 'stripe';
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const prisma = new PrismaClient()

export const makePayment = async (products) => {
    try {
        const sessionData = await getServerSession(authOptions);
        const email = sessionData?.user?.email;
        if (!email) {
            return [];
        }

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        let productIds = products.map((product) => { return product.productId});
        let orderItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: [product.photo],
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.qty,
            
        }));

        let session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: orderItems,
            payment_intent_data: {
                metadata: {
                    productIds: productIds.toString(),  // Include product IDs here
                    buyerId: user?.id, // Include the buyer's ID (if available)
                }
            },
            mode: "payment",
            success_url: "http://localhost:3000",
            cancel_url: "http://localhost:3000/cancel"
        });
        return session
    } catch (error) {
        console.log(error);
    }
}