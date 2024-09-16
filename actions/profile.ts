'use server';
import { getProfileDataFromDBUsingPath, updateProfileData } from "@/lib/db/profile";
import { Prisma } from "@prisma/client";
import { getUser } from "@/lib/auth";

export const handleProfileDataSubmit = async (
    profileName: string,
    urlPath: string,
    bio: string,
    links: Prisma.JsonArray
) => {
    const user = await getUser();
    try {
        await updateProfileData(
            user?.email,
            profileName,
            urlPath,
            bio,
            links,
        )
    } catch (error) {
        console.log(error)
    }
}

export const getProfileDataUsingPath = async (urlPath: string | undefined) => {
    try {
        return await getProfileDataFromDBUsingPath(urlPath);
    } catch (error) {
        console.log(error)
    }
}