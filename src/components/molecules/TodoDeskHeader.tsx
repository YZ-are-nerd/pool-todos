import React from 'react'
import { BiChevronLeft, BiDotsVerticalRounded } from 'react-icons/bi';
import { ITodosTasks } from '../../api/types';

type Props = {
  listName: string,
  refresh: () => void,
  list?: {checkedList: ITodosTasks[] | null, unCheckedList: ITodosTasks[] | null, list: ITodosTasks[] | null},
}
const TodoDeskHeader: React.FC<Props> = ({listName, list,refresh}) => {
  return (
    <div className="w-full h-fit flex items-center justify-between">
      <div className="w-fit h-full flex items-center gap-1">
        <h3 className="text-2xl font-bold">{listName}</h3>
        {
          list && 
          <p className='text-neutral-400 mt-1 font-semibold'>{list.checkedList?.length}/{list.list?.length}</p>
        }
      </div>
      <button onClick={refresh}><BiDotsVerticalRounded/></button>
    </div>
  )
}

export default TodoDeskHeader