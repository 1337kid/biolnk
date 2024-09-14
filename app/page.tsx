import CustomButton from "@/components/CustomButton";
import Navbar from "@/components/Navbar";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

export default async function Home() {
  const user = await getUser();

  return (
    <div className="p-2 h-screen">
      <div className="bg-zinc-950/80 h-[calc(100vh-1rem)] rounded-xl border border-zinc-950">
        <Navbar auth={user}/>
        <div className="flex container m-auto justify-center items-center p-2 flex-col gap-2">
          <h1 className="text-center w-[600px] max-md:w-full text-[100px] leading-[110px] max-md:text-[80px] max-md:leading-[90px] font-[600] text-violet-300 mt-10 max-md:mt-5 mb-5">
            All Your <span className="gradient-text">Links</span> in One <span className="bg-zinc-950 rounded-md px-2">
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
        </div>
      </div>
    </div>
  );
}
