"use server"
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const prisma = new PrismaClient()

export const getCarts = async () => {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        if (!email) {
            return [];
        }

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        const carts = user && await prisma.cart.findMany(
            {
                where: {
                    userId: user.id,
                },
                include: {
                    product: {
                        include: {
                            photos: true,
                        }
                    },
                }
            }
        );
        return carts;
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = async (productId, qty=1) => {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        if (!email) {
            return [];
        }

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        const cart = user && await prisma.cart.create(
            {
                data: {
                    productId: parseInt(productId),
                    userId: user.id,
                    qty: parseInt(qty)
                }
            }
        );
        return cart;
    } catch (error) {
        console.log(error);
    }

}

export const removeCart = async (id: number) => {
    try {
        const cart = id && await prisma.cart.delete({
            where: {
                id,
            },
        });
        return cart;
    } catch (error) {
        console.log(error);
    }
}

export const updateCartQty = async (id: number, qty: number) => {
    try {
        const cart = id && await prisma.cart.update({
            where: {
                id
            },
            data: {
                qty
            },
        });
        return cart;
    } catch (error) {
        console.log(error);
    }

}