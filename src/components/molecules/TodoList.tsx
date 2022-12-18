import TodoCard from './TodoCard';
import { Suspense, useState } from 'react';
import { BiPlus, BiSave } from 'react-icons/bi';
import CheckBox from '../atoms/CheckBox';
import { controllerAPI } from '../../api/controller.api';
import { ITodosTasks } from '../../api/types';
import TodoCardSkeleton from '../../skeletons/TodoCard.skeleton';
type Props = {
  list: ITodosTasks[],
  deskID: string
}
const TodoList: React.FC<Props> = ({list, deskID}) => {
  return (
    <>
        {list.map((todo) =>
          <Suspense key={todo.id + 'fallback'} fallback={<TodoCardSkeleton todoData={todo}/>}>
            <TodoCard key={todo.id} todo={todo} />
         </Suspense> 
        )}
    </>
  )
}

export default TodoList