interface LandingCardProps {
    title: string
    text: string
}


const LandingCard = ({title, text} : LandingCardProps) => {
  return (
    <div className='bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-400 p-[1px] rounded-xl'>
      <div className='bg-zinc-950/[.85] w-[270px] rounded-xl p-4 h-full text-purple-200'>
        <h3 className="text-2xl font-[500] mb-2 gradient-text">{title}</h3>
        <p className="text-lg leading-6">{text}</p>
      </div>
    </div>
  )
}

export default LandingCard