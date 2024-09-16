import { getProfileDataUsingPath } from "@/actions/profile";
import { NextResponse } from "next/server"; 

export async function GET(
  request: Request,
  { params }: { params: { path: string } }
) {
  const user = await getProfileDataUsingPath(params.path);
  if (!user) return NextResponse.json({error: "User not found"}, {status: 404});
  return NextResponse.json(user);
}