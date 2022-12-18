import React, { Suspense, useState } from 'react'
import { BiSave, BiPlus } from 'react-icons/bi'
import { controllerAPI } from '../../api/controller.api'
import { ITodosTasks } from '../../api/types'
import CheckBox from '../atoms/CheckBox'
import TodoCard from '../molecules/TodoCard'
import TodoList from '../molecules/TodoList'
type Props = {
    list: {checkedList: ITodosTasks[] | null, unCheckedList: ITodosTasks[] | null, list: ITodosTasks[] | null},
    deskID: string
  }
const TodoDeskBody: React.FC<Props> = ({list, deskID,}) => {
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
      <div className="w-full h-full flex flex-col overflow-x-auto gap-2">
        <div onClick={() => setEditMode(!editMode)} className="w-full h-8 rounded-xl flex items-center justify-center cursor-pointer bg-neutral-700 hover:bg-opacity-75">
          {
            editMode ?
            <div onClick={e => e.stopPropagation()} className='w-full h-full flex items-center gap-2 p-2'>
              <CheckBox checked={checked} setChecked={setChecked} />
              <input autoFocus={true} value={title} onChange={e => setTitle(e.target.value)} placeholder='Какую задачу добавим?'
              className='w-full h-full text-neutral-400 font-semibold bg-transparent' type="text"/>
              <button disabled={title.length < 2 ? true : false} onClick={addTodo} 
              className='p-1 rounded-lg text-neutral-400 bg-neutral-800 disabled:text-neutral-600'><BiSave/></button>
            </div>
            : <BiPlus className='text-white' size={24} />
          }
        </div>
        <TodoList deskID={deskID} list={list.unCheckedList!} />
        <TodoList deskID={deskID} list={list.checkedList!} />
      </div>
    )
}

export default TodoDeskBody