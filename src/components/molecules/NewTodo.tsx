import React, { useState } from 'react'
import { BiX, BiSave, BiPlus } from 'react-icons/bi'
import { controllerAPI } from '../../api/controller.api'
import CheckBox from '../atoms/CheckBox'
type Props = {
    deskID: string
}
const NewTodo: React.FC<Props> = ({deskID}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const addTodo = async() => {
      await controllerAPI.addNewTodo(deskID, checked, title)
      setChecked(false)
      setTitle('')
      setEditMode(false)
    }
  return (
    <div onClick={() => setEditMode(!editMode)} className="w-full h-8 rounded-xl flex items-center justify-center cursor-pointer bg-neutral-700 hover:bg-opacity-75">
        {
        editMode ?
        <div onClick={e => e.stopPropagation()} className='w-full h-full flex items-center gap-2 p-2'>
            <CheckBox checked={checked} setChecked={setChecked} />
            <input autoFocus={true} value={title} onChange={e => setTitle(e.target.value)} placeholder='Какую задачу добавим?'
            className='w-full h-full text-neutral-400 font-semibold bg-transparent' type="text"/>
            <button onClick={title.length < 2 ? () => setEditMode(false) : addTodo} 
            className='p-1 rounded-lg text-neutral-400 bg-neutral-800 disabled:text-neutral-600'>{title.length < 2 ? <BiX/> :<BiSave/>}</button>
        </div>
        : <BiPlus className='text-white' size={24} />
        }
    </div>
  )
}

export default NewTodo