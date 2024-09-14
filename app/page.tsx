"use client";
import { useTransition } from "react";
import { Provider } from "@supabase/supabase-js";
import { loginAction, signoutAction } from "@/actions/users";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isPending, startTransistion] = useTransition();
  const router = useRouter();

  const handleButtonClick = (provider: Provider) => {
    startTransistion(async () => {
      const {error, url} = await loginAction(provider);
      if (!error && url) router.push(url);
      else console.log("not logginge")
    })
  }

  const handleSignOut = () => {
    startTransistion(async () => {
      const {error} = await signoutAction();
      if (error) console.log(error)
      else console.log("signed out")
    })
  }

  return (
    <div className="">
      <button
        onClick={() => handleButtonClick('google')}
      >
        Sign IN
      </button>
      <button
        onClick={() => handleSignOut()}
      >
        Sign OUT
      </button>
    </div>
  );
}
