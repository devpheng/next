import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getFavorites = async (email: any) => {
    try {
        if(!email) {
            return [];
        }

        const user = await prisma.user.findFirst({where: {
            email
        }});

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