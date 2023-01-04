import React from 'react'
import { ITodosTasks } from '../api/types'
import { motion } from 'framer-motion'
import { BiLoaderAlt } from 'react-icons/bi'
type Props = {
    todoData: ITodosTasks
}
const TodoCardSkeleton: React.FC<Props> = ({todoData}) => {
  const cardVars = {
    initial: {
      scale: 1
    },
    animate: {
      scale: .95,
      transition: {
        duration: .5
      }
    }
  }
  return (
    <motion.div variants={cardVars} initial='initial' animate='animate' 
    className="w-full h-fit flex items-center cursor-pointer gap-2 p-2 rounded-xl bg-neutral-800">
        <BiLoaderAlt className='text-neutral-500 animate-spin' size={20} />
        <p className='font-semibold text-neutral-500'>{todoData.title}</p>
    </motion.div>
  )
}

export default TodoCardSkeleton