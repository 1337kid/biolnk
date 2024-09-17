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
            banner: true,
            email: true
        }
    })
    return profile;
}

export const getProfileDataFromDB = async (email: string | undefined) => {
    const prisma = new PrismaClient();
    const profile = await prisma.users.findFirst({
        where: {
            email: email
        },
        select: {
            name: true,
            bio: true,
            links: true,
            urlpath: true,
        }
    })
    return profile;
}

export const updateProfileBannerURL = async (
    email: string | undefined,
    url: string
) => {
    const prisma = new PrismaClient();
    await prisma.users.update({
        where: {
            email: email
        },
        data: {
            banner: url
        }
    });
}

export const updateProfileImageURL = async (
    email: string | undefined,
    url: string
) => {
    const prisma = new PrismaClient();
    await prisma.users.update({
        where: {
            email: email
        },
        data: {
            image: url
        }
    });
}