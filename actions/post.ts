import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const getPosts = async () => {
    try {
        let posts = await prisma.post.findMany({
            include: {
                user: true,
            },
            orderBy: [
                {
                    createdAt: 'desc',
                }
            ],
        });
        return posts;
    } catch (error) {
        console.log(error);
    }
}

export const getPost = async (id) => {
    try {
        const post = await prisma.post.findFirst({
            include: {
                user: true,
            },
            where: {
                id
            }
        });
        return post;
    } catch (error) {
        console.log(error);
    }
}