"use client";

interface CustomButtonProps {
  text: string
  handleClick?: () => void
  varient: 'navbar' | 'landing' | 'form'
  isPending?: boolean
  isPendingText?: string
  RightIcon?: any
}

const CustomButton = ({
    text,
    handleClick,
    varient,
    isPending,
    isPendingText,
    RightIcon
  } : CustomButtonProps) => {

  const classes = {
    navbar: "py-1 px-3 bg-zinc-800 hover:bg-zinc-900 rounded-md",
    landing: "py-3 px-6 text-xl bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-400 hover:scale-[110%] transition-all rounded-full border-1 border-zinc-900 rounded-full",
    form: "py-1 px-3 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-400 text-black rounded-md items-center justify-center hover:bg-gradient-to-r hover:from-purple-400 hover:via-violet-600 hover:to-indigo-500 transition-all"
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 text-lg ${classes[varient]}`}
    >
      {isPending ? isPendingText : text}
      {RightIcon && RightIcon}
    </button>
  )
}

export default CustomButton