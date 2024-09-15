import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient();

export const updateProfileData = async (
    email: string | undefined,
    profileName: string,
    urlPath: string,
    bio: string,
    links: Prisma.JsonArray
) => {
    await prisma.users.update({
        where: {
            email: email
        },
        data: {
            name: profileName,
            urlpath: urlPath,
            bio: bio,
            links: links
        }
    })
}