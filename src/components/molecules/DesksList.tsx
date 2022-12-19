import { Suspense, useLayoutEffect, useState } from 'react';
import { supabase } from '../../api/client';
import { IDeskTodos } from '../../api/types';
import TodoDeskSkeleton from '../../skeletons/TodoDesk.skeleton';
import TodoDesk from '../organisms/TodoDesk';
type Props = {
  list: IDeskTodos[],
  roomID: string,
  refresh: () => void
}
const DesksList: React.FC<Props> = ({list, roomID, refresh}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  useLayoutEffect(() => {
    supabase
    .channel(`public:desk_todo:ref_to_room=eq.${roomID}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'desk_todo', filter: `ref_to_room=eq.${roomID}` }, payload => {
      console.log(payload);
      if (payload.eventType === 'DELETE' || payload.eventType === 'INSERT') {
        refresh()
      }
    })
    .subscribe()
  },[roomID])
    return (
      <>
          {
            
              list.map((desk) => 
              <Suspense key={desk.id + 'skeleton'} fallback={<TodoDeskSkeleton />}>
                <TodoDesk editMode={editMode} setEditMode={setEditMode} data={desk} key={desk.id} />
              </Suspense>)
          }
      </>
    )
}

export default DesksList