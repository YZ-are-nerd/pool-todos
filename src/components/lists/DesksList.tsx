import { Suspense, useLayoutEffect } from 'react';
import { useRecoilCallback, useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { supabase } from '../../api/client';
import { controllerAPI } from '../../api/controller.api';
import TodoDeskSkeleton from '../../skeletons/TodoDesk.skeleton';
import { DeskTodos } from '../../store/RoomDesks';
import TodoDesk from '../Room/organisms/TodoDesk';
import NewDeskTodo from '../modals/NewDeskTodo';
type Props = {
  roomID: string,
}
const DesksList: React.FC<Props> = ({roomID}) => {
  const room = useRecoilValue(DeskTodos(roomID))
  const refresh = useRecoilRefresher_UNSTABLE(DeskTodos(roomID))
  const listWatcher = useRecoilCallback(({snapshot, set}) => async () => {
    const lists = await controllerAPI.getDeskTodosByID(roomID)
    const snap = snapshot.getLoadable(DeskTodos(roomID))
    if (lists) {
      if (snap.getValue()?.length !== lists?.length) {
        set(DeskTodos(roomID), lists)
      }
      set(DeskTodos(roomID), lists)
    }
  })
  useLayoutEffect(() => {
    supabase
    .channel(`public:desk_todo:ref_to_room=eq.${roomID}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'desk_todo', filter: `ref_to_room=eq.${roomID}` }, payload => {
      console.log(payload);
      if (payload.eventType === 'DELETE' || payload.eventType === 'INSERT') {
        listWatcher()
      }
    })
    .subscribe()
  },[roomID])
    return (
      <>
          {
              room && room.map((desk) => 
              <Suspense key={desk.id + 'skeleton'} fallback={<TodoDeskSkeleton />}>
                <TodoDesk  data={desk} key={desk.id} />
              </Suspense>)
          }
          <NewDeskTodo roomID={roomID} />
      </>
    )
}

export default DesksList