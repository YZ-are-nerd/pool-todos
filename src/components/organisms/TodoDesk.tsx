import TodoDeskHeader from '../molecules/TodoDeskHeader';
import { Suspense } from 'react';
import { IDeskTodos } from '../../api/types';
import TodoDeskBody from './TodoDeskBody';
import TodoDeskToolBar from '../molecules/TodoDeskToolBar';
import TodoDeskBodySkeleton from '../../skeletons/TodoDeskBody.skeleton';
type Props = {
  data: IDeskTodos
}
const TodoDesk: React.FC<Props> = ({data}) => {
    return (
        <div className="w-7/12 lg:w-3/12 h-full snap-always snap-center shrink-0 rounded-xl p-2 gap-2 inline-flex flex-col bg-neutral-800">
            <TodoDeskHeader deskID={data.id}  listName={data.title} />
            <Suspense fallback={<TodoDeskBodySkeleton />}>
              <TodoDeskBody data={data} deskID={data.id} />
            </Suspense>
        </div>
    )
}

export default TodoDesk