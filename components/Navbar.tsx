"use client";
import { loginAction, signoutAction } from "@/actions/users";
import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import CustomButton from "./CustomButton";
import NavLogo from "@/assets/icon.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = ({auth} : {auth:any}) => {
  const [isPending, startTransistion] = useTransition();
  const router = useRouter();
  
  const handleSignIn = (provider: Provider) => {
    startTransistion(async () => {
      const {error, url} = await loginAction(provider);
      if (!error && url) router.push(url);
      else console.log("not loggedin")
    })
  }
  
  const handleSignOut = () => {
    startTransistion(async () => {
      const {error} = await signoutAction();
      if (error) console.log(error)
      else router.push('/');
    })
  }

  return (
    <nav className="absolute top-0 py-2 px-4 rounded-xl w-full flex items-center justify-between bg-zinc-950 h-[60px] text-white">
      <Link href="/">
        <Image src={NavLogo} alt="logo" className="max-h-10 max-w-10"/>
      </Link>
      <div className="flex gap-2 items-center justify-center">
        {auth ? 
          <CustomButton
            text="Sign Out"
            handleClick={() => handleSignOut()}
            varient="navbar"
            isPending={isPending}
            isPendingText="Signing Out..."
            RightIcon={<MdOutlineLogout/>}
          />
        : <CustomButton
            text="Sign In"
            handleClick={() => handleSignIn('google')}
            varient="navbar"
            isPending={isPending}
            isPendingText="Signing In..."
            RightIcon={<MdOutlineLogin/>}
          />}
      </div>
    </nav>
  )
}

export default Navbar;