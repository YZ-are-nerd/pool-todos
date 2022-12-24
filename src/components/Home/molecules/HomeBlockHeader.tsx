import React from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { Link } from 'react-router-dom'
type Props = {
    title: string,
    link: string
}
const HomeBlockHeader: React.FC<Props> = ({title, link}) => {
  return (
    <div className="w-full h-fit flex items-center justify-between">
      <h1 className="text-lg md:text-2xl inline-block lg:text-4xl font-bold">{title}</h1>
      <Link to={link} 
      className='flex items-center gap-1'>
        <span className='hidden lg:inline text-neutral-400'>Показать все</span>
        <BiChevronRight className='mt-0.5 text-neutral-400' size={24}/>
      </Link>
    </div>
  )
}

export default HomeBlockHeader