"use server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAbout = async () => {
    try {
        const about = await prisma.page.findFirst(
            {
                where: {
                    name: "about us",
                }
            }
        );

        return about;
    } catch (error) {
        console.log(error);
    }
}