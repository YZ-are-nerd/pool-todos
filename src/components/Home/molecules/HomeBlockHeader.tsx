import React from 'react'
import { BiChevronRight } from 'react-icons/bi'
type Props = {
    title: string
}
const HomeBlockHeader: React.FC<Props> = ({title}) => {
  return (
    <div className="w-full h-fit flex items-center justify-between">
      <h1 className="text-lg md:text-2xl inline-block lg:text-4xl font-bold">{title}</h1>
      <button className='flex items-center gap-1'><span className='hidden lg:inline'>Показать все</span><BiChevronRight className='mt-0.5' size={24}/></button>
    </div>
  )
}

export default HomeBlockHeader