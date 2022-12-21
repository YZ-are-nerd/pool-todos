import CheckBox from '../atoms/CheckBox';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Todo } from '../../store/Todo';
import { controllerAPI } from '../../api/controller.api';
import { ITodosTasks } from '../../api/types';
import { supabase } from '../../api/client';
import { BiTrash } from 'react-icons/bi';
type Props = {
  todo: ITodosTasks,
  index: number,
  changeWatcher: () => Promise<void> 
}
const TodoCard: React.FC<Props> = ({todo, changeWatcher}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [todoData, setTodoData] = useRecoilState(Todo(todo.id))
  const [checked, setChecked] = useState<boolean>(todoData.state)
  const updateState = async() => {
    await controllerAPI.updateTodoState(todo.id, checked)
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
  return (
    <div onContextMenu={e => {e.preventDefault(); setEditMode(!editMode)}} className="w-full h-fit flex items-center gap-2">
      <div 
      onClick={() => setChecked(!checked)} className="w-full h-fit flex items-center cursor-pointer gap-2 p-2 rounded-xl bg-neutral-700">
          <CheckBox checked={checked} setChecked={setChecked} />
          <p className={`font-semibold select-none ${checked ? 'line-through text-neutral-500' : ''}`}>{todoData.title}</p>
      </div>
      {
        editMode ?
        <button onClick={() => controllerAPI.deleteTodo(todoData.id)} className='p-1 rounded-md bg-red-600 text-red-600 bg-opacity-30'><BiTrash size={20}/></button>
        : null
      }
    </div>
  )
}

export default TodoCard