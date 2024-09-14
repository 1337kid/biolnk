import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

export const checkUserFromDB = async (email: string | undefined) => {
    const user = await prisma.users.findUnique({
        where: {
            email: email
        }
    });
    if (!user) return false;
    return true;
}

export const insertUserIntoDB = async (email: string) => {
    await prisma.users.create({
        data: {
            email: email
        }
    })
}