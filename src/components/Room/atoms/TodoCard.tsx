import CheckBox from './CheckBox';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Todo } from '../../../store/Todo';
import { controllerAPI } from '../../../api/controller.api';
import { ITodosTasks } from '../../../api/types';
import { supabase } from '../../../api/client';
import { BiPencil, BiSave, BiTrash, BiX } from 'react-icons/bi';
type Props = {
  todo: ITodosTasks,
  index: number,
  changeWatcher: () => Promise<void> 
}
const TodoCard: React.FC<Props> = ({todo, changeWatcher}) => {
  const [renameMode, setRenameMode] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [todoData, setTodoData] = useRecoilState(Todo(todo.id))
  const [checked, setChecked] = useState<boolean>(todoData.state)
  const [newName, setNewName] = useState<string>(todoData.title)
  const updateState = async() => {
    await controllerAPI.updateTodoState(todo.id, checked)
  }
  const getRenameMode = () => {
    setEditMode(false)
    setRenameMode(true)
  }
  const saveNewName = async() => {
    if (newName !== todoData.title) {
      await controllerAPI.updateTodoTitle(todo.id, newName)
      setRenameMode(false)
    }
  }
  useEffect(() => {
    updateState()
  },[checked])
  useEffect(() => {
    supabase
    .channel(`public:todo:id=eq.${todo.id}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'todo', filter: `id=eq.${todo.id}` }, payload => {
      if (payload.eventType === 'UPDATE') {
        setTodoData(payload.new as ITodosTasks)
        changeWatcher()
      }
    })
    .subscribe()
  },[])
  if (renameMode) {
    return (
    <div className="w-full h-fit flex items-center gap-2">
      <div className="w-full h-fit flex items-center cursor-pointer gap-2 p-2 rounded-xl bg-neutral-700">
        <input autoFocus={true} value={newName} onChange={e => setNewName(e.target.value)}
        onKeyUp={e => {if(e.key === 'Enter') saveNewName()}}
        className='w-full h-full text-neutral-400 font-semibold bg-transparent' type="text" />
      </div>
      <button 
      onClick={() => newName === todoData.title ? setRenameMode(false) : saveNewName()} className='p-1 rounded-md bg-neutral-700'>
        {newName === todoData.title ? <BiX size={20}/> :<BiSave size={20}/>}
      </button>
    </div>
    )
  } else return (
    <div onContextMenu={e => {e.preventDefault(); setEditMode(!editMode)}} className="w-full h-fit flex items-center gap-2">
      <div 
      onClick={() => setChecked(!checked)} className="w-full h-fit flex items-center cursor-pointer gap-2 p-2 rounded-xl bg-neutral-700 hover:bg-opacity-80">
          <CheckBox checked={checked} setChecked={setChecked} />
          <p className={`font-semibold select-none ${checked ? 'line-through text-neutral-500' : ''}`}>{todoData.title}</p>
      </div>
      {
        editMode ?
        <>
          <button onClick={getRenameMode} className='p-1 rounded-md bg-neutral-700'><BiPencil size={20}/></button>
          <button onClick={() => controllerAPI.deleteTodo(todoData.id)} className='p-1 rounded-md bg-red-600 text-red-600 bg-opacity-30'><BiTrash size={20}/></button>
        </>
        : null
      }
    </div>
  )
}

export default TodoCard