"use client";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MdOpenInNew } from "react-icons/md";
import { CirclesWithBar } from "react-loader-spinner";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false)
  const [profile, setData] = useState({
    name: "",
    banner: "",
    image: "",
    bio: "",
    links: [{link:"",title:""}]
  })

  useEffect(() => {
    setIsLoading(true);  
    fetch(`/api/profile/${pathname.split('/')[1]}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(true);
          setIsLoading(false);
          return;
        }
        setData(data);
        setIsLoading(false);
      });
  },[pathname])

  return (
    <div className="p-2 h-screen">
      <div className="bg-zinc-950/80 h-[calc(100vh-1rem)] rounded-xl border border-zinc-950 relative">
        <nav className="absolute top-0 py-2 px-4 rounded-xl w-full flex items-center justify-between bg-zinc-950 h-[60px] text-white">
          <h3 className="text-2xl">BioLnk</h3>
        </nav>
        <div className="flex m-auto justify-between items-center flex-col max-lg:gap-10 h-full overflow-scroll">
          <div className="flex justify-center container px-2">
          {!isLoading ? (
            <div className="flex flex-col gap-2 w-[600px] mt-20 bg-zinc-900 rounded-lg text-purple-300 max-md:w-full">
              {error ? (<></>) : (
                <>
                  <div className="bg-zinc-900 relative min-h-[180px] rounded-lg">
                    <img
                      src={profile.banner 
                          ? profile.banner 
                          : '/assets/nobanner.png'}
                      alt="no banner"
                      width={1200}
                      height={20}
                      className="object-cover rounded-lg min-h-[120px] h-[120px]"
                    />
                    <img
                      src={profile.image 
                          ? profile.image 
                          : '/assets/nobanner.png'}
                      alt="no image"
                      width={100}
                      height={100}
                      className="absolute top-[70px] left-[50px] max-sm:left-[20px] object-cover rounded-lg h-[100px] w-[100px]"
                    />
                    <h3 className="absolute top-[130px] text-violet-300 right-[1rem] text-2xl font-[450]">{profile.name}</h3>
                  </div>
                  <div className="p-2">
                    <p className="bg-zinc-800 rounded-md p-2 text-zinc-300 font-[450] mb-2">
                      {profile.bio ? profile.bio : 'No Bio Added'}
                    </p>
                    <div className="bg-zinc-600 h-[1px] w-full"/>

                    <div className=" flex flex-col gap-2 justify-center items-center mt-2">
                      {profile.links && profile.links.length != 0 ? profile.links.map((link, index) =>(
                          <a key={index} href={link.link} className="w-full text-lg font-[450]" target="_blank" rel="noreferrer nofollow">
                            <div className="flex justify-between items-center p-2 rounded-lg border border-violet-400 hover:bg-violet-400 hover:text-zinc-900">
                              {link.title}
                              <MdOpenInNew className="text-[25px]"/>
                            </div>
                          </a>
                      ))
                      : <span>No Links Found</span>}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="absolute flex justify-center items-center m-auto min-h-screen">
            <CirclesWithBar
              height="100"
              width="100"
              color="#9333ea"
              outerCircleColor="#7c3aed"
              innerCircleColor="#9333ea"
              barColor="#7c3aed"
              ariaLabel="circles-with-bar-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              />
          </div>
          )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
