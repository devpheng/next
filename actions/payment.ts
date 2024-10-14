"use server"
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const makePayment = async (products) => {
    try {
        let orderItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.name,
                    images: [product.photo],
                },
                unit_amount: Math.round(product.price * 100)
            },
            quantity: product.qty
        }));

        let session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: orderItems,
            mode: "payment",
            success_url: "http://localhost:3000",
            cancel_url: "http://localhost:3000/cancel"
        });
        return session
    } catch (error) {
        console.log(error);
    }
}