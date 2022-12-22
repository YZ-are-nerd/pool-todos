import { Suspense } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil'
import RoomLinkSkeleton from '../../skeletons/RoomLink.skeleton'
import { UserRooms } from '../../store/UserRooms'
import RoomLink from '../Home/atoms/RoomLink'
import NewRoom from '../modals/NewRoom'

const RoomsLinksList = () => {
  const rooms = useRecoilValue(UserRooms)
  const refresh = useRecoilRefresher_UNSTABLE(UserRooms)
  return (
    <>
        {rooms && rooms.map((room) => 
            <Suspense key={room.id + 'skeleton'} fallback={<RoomLinkSkeleton/>}>
                <RoomLink key={room.id} room={room} />
            </Suspense>
        )}
        <NewRoom refresh={refresh} />
    </>
  )
}

export default RoomsLinksList