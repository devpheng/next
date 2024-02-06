import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const prisma = new PrismaClient()

export const getProducts = async () => {
    try {
        const session = await getServerSession(authOptions);
        let user;
        let products;

        if(session) {
            const email = session?.user?.email;
            user = await prisma.user.findFirst({where: {
                email
            }});
            products = await prisma.product.findMany({include: {
                photos: true,
                reviews: true,
                favorites: {
                    where: { userId: user?.id },
                    include: {
                        user: true
                    }
                }
            },});
        } else {
            products = await prisma.product.findMany({include: {
                photos: true
            },});
        }

        return products;
    } catch (error) {
        console.log(error);
    }
}