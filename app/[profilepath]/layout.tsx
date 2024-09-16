import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { getProfileDataUsingPath } from "@/actions/profile";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(
  { params } : 
  { params: { profilepath: string } }
): Promise<Metadata> {
  const profile = await getProfileDataUsingPath(params.profilepath);
  if(!profile) {
    return {
      title: "Profile not found | BioLnk",
      description: "The profile you are looking for could not be found."
    }
  }

  return {
    title: `${profile.name ? profile.name : ''} | BioLnk`,
    description: `${profile.bio ? profile.bio : ''}`
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
