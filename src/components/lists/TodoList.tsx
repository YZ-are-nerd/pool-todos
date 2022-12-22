import { lazy, Suspense } from 'react';
import { ITodosTasks } from '../../api/types';
import TodoCardSkeleton from '../../skeletons/TodoCard.skeleton';
const TodoCard = lazy(() => import('../Room/atoms/TodoCard'))
type Props = {
  list: ITodosTasks[],
  deskID: string,
  changeWatcher: () => Promise<void>
}
const TodoList: React.FC<Props> = ({list, changeWatcher}) => {
  return (
    <>
        {list.map((todo, index) =>
          <Suspense key={todo.id + 'fallback'} fallback={<TodoCardSkeleton todoData={todo}/>}>
            <TodoCard changeWatcher={changeWatcher} index={index} key={todo.id} todo={todo} />
         </Suspense> 
        )}
    </>
  )
}

export default TodoList