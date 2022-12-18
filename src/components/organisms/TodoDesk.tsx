import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from 'recoil';
import TodoDeskHeader from '../molecules/TodoDeskHeader';
import TodoList from '../molecules/TodoList';
import { TodosTasks } from '../../store/TodoList';
import { useEffect } from 'react';
import { supabase } from '../../api/client';
import { BiLoaderAlt, BiPencil, BiTrash } from 'react-icons/bi';
import { IDeskTodos } from '../../api/types';
import TodoDeskBody from './TodoDeskBody';
import { controllerAPI } from '../../api/controller.api';

type Props = {
  data: IDeskTodos
}
const TodoDesk: React.FC<Props> = ({data}) => {
    const tasksList = useRecoilValueLoadable(TodosTasks(data.id))
    const refresh = useRecoilRefresher_UNSTABLE(TodosTasks(data.id))
    useEffect(() => {
      supabase
      .channel(`public:todo:ref_to_desk=eq.${data.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todo', filter: `ref_to_desk=eq.${data.id}` }, payload => {
        if (payload.eventType === 'DELETE' || payload.eventType === 'INSERT') {
          refresh()
        }
      })
      .subscribe()
    },[])
    if (tasksList.state === 'loading') {
      return (
        <div className="w-7/12 lg:w-3/12 h-full snap-always snap-center shrink-0 rounded-xl p-2 gap-2 flex flex-col bg-neutral-800">
          <TodoDeskHeader refresh={refresh} listName={data.title} />
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <BiLoaderAlt className='animate-spin text-white' size={24} />
          </div>
        </div>
      )
    } else return (
      <div className="w-7/12 lg:w-3/12 h-full snap-always snap-center shrink-0 rounded-xl p-2 gap-2 inline-flex flex-col bg-neutral-800">
          <TodoDeskHeader list={tasksList.getValue()} refresh={refresh} listName={data.title} />
          <div className="w-full h-full overflow-y-auto">
            <div className="w-full h-fit flex flex-col shrink-0">
              <TodoDeskBody deskID={data.id} list={tasksList.getValue()} />
            </div>
          </div>
          <div className="w-full h-fit max-h-12 flex items-center gap-2 rounded-xl">
            <button onClick={() => controllerAPI.deleteDeskTodo(data.id)} className='py-1 px-2 rounded-md flex items-center gap-1 bg-neutral-600'>
              <BiTrash size={20}/>
              {/* <p className='font-semibold'>Очистить список</p> */}
            </button>
            <button className='py-1 px-2 rounded-md flex items-center gap-1 bg-neutral-600'>
              <BiPencil size={20}/>
              {/* <p className='font-semibold'>Редакторовать список</p> */}
            </button>
          </div>
      </div>
    )
}

export default TodoDesk