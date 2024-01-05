import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProducts = async () => {
    try {
        const products = await prisma.product.findMany({include: {
            photos: true,
          },});
        return products;
    } catch (error) {
        console.log(error);
    }
}