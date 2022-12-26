import { Suspense, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { supabase } from '../../api/client'
import { controllerAPI } from '../../api/controller.api'
import RoomLinkSkeleton from '../../skeletons/RoomLink.skeleton'
import { User } from '../../store/User'
import { LimitedUserRooms, UserRooms } from '../../store/UserRooms'
import RoomLink from '../Home/atoms/RoomLink'
// import NewRoom from '../modals/NewRoom'

const RoomsLinksList = () => {
  const user = useRecoilValue(User)
  const rooms = useRecoilValue(LimitedUserRooms(user?.id!))
  const changeWatcher = useRecoilCallback(({snapshot, set}) => async () => {
    const rooms = await controllerAPI.getRoomsByUserID(user?.id!)
    const snap = snapshot.getLoadable(LimitedUserRooms(user?.id!))
    if (rooms?.length !== snap.getValue()?.length) {
      set(LimitedUserRooms(user?.id!), rooms)
    }
  })
  useEffect(() => {
    supabase
    .channel(`public:rooms:room_owner=eq.${user?.id}1`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms', filter: `room_owner=eq.${user?.id}` }, payload => {
      if (payload.eventType === 'DELETE' || payload.eventType === 'INSERT') {
        changeWatcher()
      }
    })
    .subscribe()
  },[])
  if (rooms && rooms.length === 0) {
    return (
      <div className="w-full h-full col-span-3 flex flex-col gap-2 items-center justify-center rounded-xl border-2 border-dashed border-neutral-700">
        <p className='text-neutral-500'>У вас нет комнат</p>
        <Link to='/rooms' className='text-blue-500'>Перейти для создания комнаты</Link>
      </div>
    )
  } else return (
    <>
        {rooms && rooms.map((room) => 
            <Suspense key={room.id + 'skeleton'} fallback={<RoomLinkSkeleton/>}>
                <RoomLink key={room.id} room={room} />
            </Suspense>
        )}
        {/* <NewRoom /> */}
    </>
  )
}

export default RoomsLinksList