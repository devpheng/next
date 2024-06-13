import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const getCategories = async () => {
    try {
        let categories = await prisma.category.findMany({
                where: { parent_id: null },
                include: { subs: true }
        });

        return categories;
    } catch (error) {
        console.log(error);
    }
}