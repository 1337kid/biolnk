import { PrismaClient, Prisma } from '@prisma/client'

export const getUserFromDB = async (email: string | undefined) => {
    const prisma = new PrismaClient();
    const user = await prisma.users.findUnique({
        where: {
            email: email
        }
    });
    if (!user) return false;
    else return true;
}

export const insertUserIntoDB = async (email: string) => {
    const prisma = new PrismaClient();
    const user = await prisma.users.create({
        data: {
            email: email
        }
    })
}