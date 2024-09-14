"use client";

interface CustomButtonProps {
  text: string
  handleClick?: () => void
  varient: 'navbar' | 'landing'
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
    landing: "py-3 px-6 text-xl bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-400 hover:scale-[110%] transition-all rounded-full border-1 border-zinc-900 rounded-full"
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