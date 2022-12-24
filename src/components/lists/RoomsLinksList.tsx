import { Suspense, useEffect } from 'react'
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
    .channel(`public:rooms:room_owner=eq.${user?.id}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms', filter: `room_owner=eq.${user?.id}` }, payload => {
      if (payload.eventType === 'DELETE' || payload.eventType === 'INSERT') {
        changeWatcher()
      }
    })
    .subscribe()
  },[])
  return (
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