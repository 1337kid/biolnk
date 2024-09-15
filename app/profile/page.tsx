import Navbar from "@/components/Navbar";
import { getUser } from "@/lib/auth";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/ProfileForm";

export default async function Page() {
  const user = await getUser();

  return (
    <div className="p-2 h-screen">
      <div className="bg-zinc-950/80 h-[calc(100vh-1rem)] rounded-xl border border-zinc-950 relative">
        <Navbar auth={user}/>
        <div className="flex m-auto justify-between items-center flex-col max-lg:gap-10 h-full overflow-scroll">
          <div className="container mt-20 flex flex-col gap-4">
            <h4 className="text-center max-md:w-full text-2xl font-[600] text-violet-300">
              Setup Your Page
            </h4>
            <div className="max-w-[600px] m-auto">
              <ProfileForm />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
