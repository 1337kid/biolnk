'use server';
import { 
    getProfileDataFromDBUsingPath,
    updateProfileData,
    updateProfileBannerURL,
    updateProfileImageURL
} from "@/lib/db/profile";
import { Prisma } from "@prisma/client";
import { getSupabaseClient, getUser } from "@/lib/auth";


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

export const handleImageUpload = async (
    formData: FormData,
    type: '_banner' | '_profile'
) => {
    try {
        const image = formData.get('file') as any
        const supabase = getSupabaseClient();
        const user = await getUser();
        const fileName = user?.id + type + '.' + image.name.split('.').pop();
    
        const { data: imageData, error } = await supabase.storage.from(
            process.env.SUPABASE_BUCKET_NAME as string
        ).upload(fileName, image, {upsert: true});
        if (error) return {error: "Error while uploading file"};
    
        const { data: imgUrl} = await supabase.storage.from(
            process.env.SUPABASE_BUCKET_NAME as string
        ).getPublicUrl(fileName);
    
        if (type == '_banner') await updateProfileBannerURL(user?.email, imgUrl.publicUrl);
        else await updateProfileImageURL(user?.email, imgUrl.publicUrl);
        return {message: "Image uploaded succesfully"}
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