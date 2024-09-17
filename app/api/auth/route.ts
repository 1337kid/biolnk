import { NextResponse } from 'next/server'
import { getSupabaseClient } from "@/lib/auth";
import { checkUserFromDB, insertUserIntoDB } from '@/lib/db/user';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = getSupabaseClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const currentUser = (await supabase.auth.getUser()).data.user;
      if (!await checkUserFromDB(currentUser?.email)) {
        const name = currentUser?.user_metadata?.name;
        const urlPath = currentUser?.email?.split("@")[0];
        await insertUserIntoDB(
          currentUser?.email!,
          name,
          urlPath!
        )
      }
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}