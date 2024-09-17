import CustomButton from "@/components/CustomButton";
import Navbar from "@/components/Navbar";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";
import { landingCardData } from "@/constants";
import LandingCard from "@/components/LandingCard";
import Footer from "@/components/Footer";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="p-2 h-dvh">
      <div className="bg-zinc-950/80 h-[calc(100dvh-1rem)] rounded-xl border border-zinc-950 relative">
        <Navbar auth={user}/>
        <div className="flex m-auto justify-between items-center flex-col max-lg:gap-10 h-full overflow-scroll">
          <h1 className="text-center w-[600px] mt-20 max-md:w-full text-[100px] leading-[110px] max-md:text-[80px] max-md:leading-[90px] font-[600] text-violet-300 container">
            All Your <span className="gradient-text">Links</span> in One
            <span className="bg-zinc-700 rounded-xl px-2">
              <span className="gradient-text">Place.</span>
            </span>
          </h1>
          {user && 
            <Link href="/profile">
              <CustomButton
                text="Setup my bio links"
                varient="landing"
                RightIcon={<MdOpenInNew/>}
              />
            </Link>
          }
          <div className="flex gap-10 max-lg:flex-col max-lg:gap-5">
            {landingCardData.map((item,index) => (
              <LandingCard
                key={index}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
