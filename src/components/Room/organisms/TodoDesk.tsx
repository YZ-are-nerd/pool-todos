import { lazy, SetStateAction, Suspense } from 'react';
import { IDeskTodos } from '../../../api/types';
const TodoDeskBody = lazy(() => import('../molecules/TodoDeskBody'));
import TodoDeskBodySkeleton from '../../../skeletons/TodoDeskBody.skeleton';
import TodoDeskHeader from '../molecules/TodoDeskHeader';
type Props = {
  data: IDeskTodos,
}
const TodoDesk: React.FC<Props> = ({data}) => {
    return (
      <div className="w-[370px] lg:w-3/12 h-full flex flex-col gap-2">

        <div 
        className={`w-full h-full snap-always snap-center 
        shrink-0 rounded-xl p-2 gap-2 inline-flex flex-col border-2 border-neutral-700 bg-neutral-800`}>
            <TodoDeskHeader deskID={data.id}  listName={data.title} />
            <Suspense fallback={<TodoDeskBodySkeleton />}>
              <TodoDeskBody data={data} deskID={data.id} />
            </Suspense>
        </div>
      </div>

    )
}

export default TodoDesk