import TodoDeskHeader from '../molecules/TodoDeskHeader';
import { lazy, SetStateAction, Suspense } from 'react';
import { IDeskTodos } from '../../api/types';
const TodoDeskBody = lazy(() => import('./TodoDeskBody'));
import TodoDeskBodySkeleton from '../../skeletons/TodoDeskBody.skeleton';
type Props = {
  data: IDeskTodos,
  editMode: boolean,
  setEditMode: React.Dispatch<SetStateAction<boolean>>
}
const TodoDesk: React.FC<Props> = ({data, editMode, setEditMode}) => {
    return (
      <div className="w-[370px] lg:w-3/12 h-full flex flex-col gap-2">
        {
          editMode ? 
          <div className='w-full h-10 px-4 flex items-center'>
            <div className="w-4 h-4 rounded border-2 border-neutral-700 bg-neutral-800"/>
          </div> 
          :null
        }
        <div onClick={() => {editMode && setEditMode(false)}}
        onContextMenu={e => {e.preventDefault(); setEditMode(true)}} 
        className={`w-full h-full snap-always snap-center 
        shrink-0 rounded-xl p-2 gap-2 inline-flex ${editMode && 'w-[95%] h-[95%] m-auto animate-shake'}
        flex-col border-2 border-neutral-700 bg-neutral-800`}>
            <TodoDeskHeader deskID={data.id}  listName={data.title} />
            <Suspense fallback={<TodoDeskBodySkeleton />}>
              <TodoDeskBody data={data} deskID={data.id} />
            </Suspense>
        </div>
      </div>

    )
}

export default TodoDesk