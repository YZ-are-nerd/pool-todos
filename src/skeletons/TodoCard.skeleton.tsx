import React from 'react'
import { ITodosTasks } from '../api/types'
type Props = {
    todoData: ITodosTasks
}
const TodoCardSkeleton: React.FC<Props> = ({todoData}) => {
  return (
    <div className="w-full h-fit flex items-center cursor-pointer gap-2 p-2 rounded-xl bg-neutral-700">
        <div className="w-4 h-4 shrink-0 rounded bg-neutral-600"></div>
        <p className='font-semibold text-neutral-500'>{todoData.title}</p>
    </div>
  )
}

export default TodoCardSkeleton