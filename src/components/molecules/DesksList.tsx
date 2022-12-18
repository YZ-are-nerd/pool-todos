import { useEffect } from 'react';
import { supabase } from '../../api/client';
import { IDeskTodos } from '../../api/types';
import TodoDesk from '../organisms/TodoDesk';
import NewDeskTodo from './NewDeskTodo';
type Props = {
  list: IDeskTodos[],
  roomID: string,
  refresh: () => void
}
const DesksList: React.FC<Props> = ({list, roomID, refresh}) => {
  useEffect(() => {
    supabase
    .channel(`public:desk_todo:ref_to_room=eq.${roomID}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'desk_todo', filter: `ref_to_room=eq.${roomID}` }, payload => {
      if (payload.eventType === 'DELETE' || payload.eventType === 'INSERT') {
        refresh()
      }
    })
    .subscribe()
  },[])
    return (
      <>
          {
              list.map((desk) => <TodoDesk data={desk} key={desk.id} />)
          }
      </>
    )
}

export default DesksList