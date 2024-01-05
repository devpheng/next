import NextAuth from "next-auth"

import GoogleProvider from "next-auth/providers/google";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, credentials }) {
            try {
                const userExists = await prisma.user.findUnique({
                    where: {
                        email: profile?.email
                    }
                });

                if (!userExists) {
                    await prisma.user.create({
                        data: {
                            email: profile?.email,
                            name: profile?.name?.replace(" ", "").toLowerCase(),
                            image: profile?.picture
                        }
                    });
                }

                return true
            } catch (error) {
                console.log(error);
                return false
            }
        },
    }
})

export { handler as GET, handler as POST }