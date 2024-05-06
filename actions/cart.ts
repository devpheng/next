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