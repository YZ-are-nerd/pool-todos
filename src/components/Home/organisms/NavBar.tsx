import React from 'react'
import { BiChevronLeft, BiCompass, BiGridAlt, BiHome } from 'react-icons/bi';

const NavBar = () => {
  return (
    <div className='w-full h-18 flex px-2 py-3 gap-2 items-center justify-end'>
        <button className='flex items-center gap-1 py-1 px-3 rounded-xl font-semibold bg-neutral-900 hover:bg-neutral-800'>
            <BiChevronLeft size={22} />
            <BiGridAlt size={18}/>
        </button>
        <div className="w-fit h-full flex items-center gap-6 mx-auto rounded-xl">
            <button className='w-fit h-full flex justify-between flex-col relative'>
                <p className='flex items-center gap-1 font-bold text-blue-600'><BiHome className='text-inherit' size={18} />Домашная комната</p>
                <span className='w-full h-1 rounded-t-xl bg-blue-600'></span>
            </button>
            {/* <button className='w-fit h-full flex justify-between flex-col relative'> */}
                {/* <p className='flex items-center gap-1 font-bold text-neutral-400'><BiCompass className='text-inherit' size={18} />Обзор</p> */}
            {/* </button> */}
        </div>
        <button className='p-2 rounded-xl bg-neutral-900'><BiCompass size={18} /></button>
        <div className="w-8 h-8 rounded-full bg-neutral-900"/>
    </div>
  )
}

export default NavBar