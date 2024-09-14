import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-zinc-950 rounded-xl w-full relative bottom-0 flex items-center justify-center flex-col gap-1 p-2'>
      <p className="flex text-purple-200 items-center gap-2 text-lg">
        Made with <FaHeart className="text-purple-500"/>
        <span>By <a className="underline underline-offset-[6px] hover:text-purple-400" href="https://github.com/1337kid/">@1337kid</a>
        </span>
      </p>
      <a className="text-purple-200 text-lg hover:text-purple-400" href="https://github.com/1337kid/biolnk">@1337kid/biolnk</a>
    </div>
  )
}

export default Footer;