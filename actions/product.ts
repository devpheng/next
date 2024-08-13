import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const prisma = new PrismaClient()

export const getProducts = async (size = "1000", categoryId=null) => {
    try {
        const session = await getServerSession(authOptions);
        let user;
        let products;
        if(session) {
            const email = session?.user?.email;
            user = await prisma.user.findFirst({where: {
                email
            }});
            let condition = {
                    include: {
                        photos: true,
                        reviews: true,
                        favorites: {
                            where: { userId: user?.id },
                            include: {
                                user: true
                            }
                        }
                    },
                    take: parseInt(size)
                };
            if (categoryId != null) {
                condition.where = {categoryId: parseInt(categoryId)};
            }
            products = await prisma.product.findMany(condition);
        } else {
            let condition = {
                include: {
                    photos: true
                },
                take: parseInt(size)
            }
            if (categoryId != null) {
                condition.where = {categoryId: parseInt(categoryId)};
            }
            products = await prisma.product.findMany(condition);
        }
        return products;
    } catch (error) {
        console.log(error);
    }
}