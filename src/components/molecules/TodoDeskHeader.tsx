import React from 'react'
import { useState } from 'react';
import { BiChevronLeft, BiDotsVerticalRounded, BiSave } from 'react-icons/bi';
import { controllerAPI } from '../../api/controller.api';
import { ITodosTasks } from '../../api/types';

type Props = {
  listName: string,
  deskID: string,
}
const TodoDeskHeader: React.FC<Props> = ({listName, deskID}) => {
  const [renameMode, setRenameMode] = useState<boolean>(false)
  const [headerTitle, setHeaderTitle] = useState<string>(listName)
  const updateTitle = async() => {
    await controllerAPI.updateListName(deskID, headerTitle)
    setRenameMode(false)
  }
  return (
    <div className="w-full h-fit flex items-center justify-start">
      <div className="w-fit h-full flex items-center gap-1">
        {
          renameMode ?
          <div className='w-full h-full flex items-center gap-1'>
            <input className='w-full h-full text-2xl font-bold text-white bg-transparent' type='text' value={headerTitle} onChange={e => setHeaderTitle(e.target.value)} />
            <button onClick={updateTitle} disabled={listName === headerTitle ? true : headerTitle.length < 2 ? true : false} className='p-1 rounded-md bg-neutral-900 bg-opacity-60'><BiSave/></button>
          </div>
          :
          <h3 onDoubleClick={() => setRenameMode(true)} className="text-2xl font-bold py-1 px-2 rounded-xl cursor-pointer hover:bg-neutral-900 hover:bg-opacity-50">{listName}</h3>
        }
      </div>
    </div>
  )
}

export default TodoDeskHeader