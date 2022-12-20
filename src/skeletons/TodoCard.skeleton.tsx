import React from 'react'
import { ITodosTasks } from '../api/types'
import { motion } from 'framer-motion'
type Props = {
    todoData: ITodosTasks
}
const TodoCardSkeleton: React.FC<Props> = ({todoData}) => {
  const cardVars = {
    initial: {
      scale: 1
    },
    animate: {
      scale: .85,
      transition: {
        duration: .5
      }
    }
  }
  return (
    <motion.div variants={cardVars} initial='initial' animate='animate' 
    className="w-full h-fit flex items-center cursor-pointer gap-2 p-2 rounded-xl bg-neutral-700">
        <div className="w-4 h-4 shrink-0 rounded bg-neutral-600"></div>
        <p className='font-semibold text-neutral-500'>{todoData.title}</p>
    </motion.div>
  )
}

export default TodoCardSkeleton