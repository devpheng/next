"use server"
import { PrismaClient } from '@prisma/client'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const prisma = new PrismaClient()

export const getFavorites = async () => {
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

        const favorites = user && await prisma.favorite.findMany(
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
        return favorites;
    } catch (error) {
        console.log(error);
    }
}

export const toggleFavorite = async (favorite: any) => {
    try {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            }
        });
        if(!user) {
            return false;
        }
       
        if (!favorite.id) {
            const { productId } = favorite;
            const userId = user.id;
            const fav = await prisma.favorite.create({
                data: {
                    productId,
                    userId
                },
            });

            return fav;
        } else {
            const fav = await prisma.favorite.delete({
                where: {
                    id: favorite.id,
                },
            });

            return fav;
        }
    } catch (error) {
        console.log(error);
    }
}