import { Suspense, useEffect } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { supabase } from '../../../api/client'
import { controllerAPI } from '../../../api/controller.api'
import RoomLinkSkeleton from '../../../skeletons/RoomLink.skeleton'
import { User } from '../../../store/User'
import { LimitedUserRoomsGrid, UserRooms } from '../../../store/UserRooms'
import RoomLink from '../../Home/atoms/RoomLink'
import NewRoom from '../../modals/NewRoom'

const RoomsList = () => {
    const user = useRecoilValue(User)
    const rooms = useRecoilValue(LimitedUserRoomsGrid(user?.id!))
    const changeWatcher = useRecoilCallback(({snapshot, set}) => async () => {
        const rooms = await controllerAPI.getRoomsByUserID(user?.id!)
        const snap = snapshot.getLoadable(LimitedUserRoomsGrid(user?.id!))
        if (rooms?.length !== snap.getValue()?.length) {
          set(LimitedUserRoomsGrid(user?.id!), rooms)
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
            {
                rooms && rooms.map((room) => <Suspense fallback={<RoomLinkSkeleton/>}><RoomLink key={room.id} room={room} /></Suspense>)
            }
            {rooms && rooms.length !== 24 && <NewRoom/>}
        </>
    )
}

export default RoomsList