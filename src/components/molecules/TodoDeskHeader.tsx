import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi';

type Props = {
  listName: string,
  refresh: () => void
}
const TodoDeskHeader: React.FC<Props> = ({listName, refresh}) => {
  return (
    <div className="w-full h-fit flex items-center justify-between">
        <h3 className="text-2xl font-bold">{listName}</h3>
        <button onClick={refresh}><BiDotsVerticalRounded/></button>
    </div>
  )
}

export default TodoDeskHeader