import { PrismaClient, Prisma } from '@prisma/client'

export const updateProfileData = async (
    email: string | undefined,
    profileName: string,
    urlPath: string,
    bio: string,
    links: Prisma.JsonArray
) => {
    const prisma = new PrismaClient();
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

export const getProfileDataFromDBUsingPath = async (urlPath: string | undefined) => {
    const prisma = new PrismaClient();
    const profile = await prisma.users.findFirst({
        where: {
            urlpath: urlPath
        },
        select: {
            name: true,
            bio: true,
            links: true,
            image: true,
            banner: true
        }
    })
    return profile;
}