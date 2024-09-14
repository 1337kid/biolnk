'use server';

import { getSupabaseClient } from "@/lib/auth";
import { Provider } from "@supabase/supabase-js";

export const loginAction = async (provider: Provider) => {
    try {
        const {data, error} = await getSupabaseClient().auth
            .signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`
                }
            })
        if (error) {
            console.log(error);
            throw error;
        }
        return {error: null, url: data.url}
    } catch (error) {
        return {error: "Error logging in"}
    }
}

export const signoutAction = async () => {
    try {
        const { error } = await getSupabaseClient().auth.signOut()
        if (error) throw error;
        return {error: null};
    } catch (error) {
        return {error: "error loggini in"}
    }
}