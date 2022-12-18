import CheckBox from '../atoms/CheckBox';
import { useEffect, useState } from 'react';
import { ITodosTasks } from '../../store/TodoList';
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';
import { Todo } from '../../store/Todo';
import { controllerAPI } from '../../api/controller.api';
type Props = {
  todo: ITodosTasks
}
const TodoCard: React.FC<Props> = ({todo}) => {
  const todoData = useRecoilValue(Todo(todo.id))
  const [checked, setChecked] = useState<boolean>(todoData.state)
  const refresh = useRecoilRefresher_UNSTABLE(Todo(todo.id))
  const updateState = async() => {
    await controllerAPI.updateTodoState(todo.id, checked)
    refresh()
  }
  useEffect(() => {
    updateState()
  },[checked])
  return (
    <div onClick={() => setChecked(!checked)} className="w-full h-fit flex items-center cursor-pointer gap-2 p-2 rounded-xl bg-neutral-700">
        <CheckBox checked={checked} setChecked={setChecked} />
        <p className={`font-semibold ${checked ? 'line-through text-neutral-500' : ''}`}>{todoData.title}</p>
    </div>
  )
}

export default TodoCard