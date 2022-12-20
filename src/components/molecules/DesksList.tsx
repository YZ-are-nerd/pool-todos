import { Suspense, useLayoutEffect, useState } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { supabase } from '../../api/client';
import TodoDeskSkeleton from '../../skeletons/TodoDesk.skeleton';
import { DeskTodos } from '../../store/RoomDesks';
import TodoDesk from '../organisms/TodoDesk';
type Props = {
  roomID: string,
}
const DesksList: React.FC<Props> = ({roomID}) => {
  const room = useRecoilValue(DeskTodos(roomID))
  const refresh = useRecoilRefresher_UNSTABLE(DeskTodos(roomID))
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
              room && room.map((desk) => 
              <Suspense key={desk.id + 'skeleton'} fallback={<TodoDeskSkeleton />}>
                <TodoDesk editMode={editMode} setEditMode={setEditMode} data={desk} key={desk.id} />
              </Suspense>)
          }
      </>
    )
}

export default DesksList