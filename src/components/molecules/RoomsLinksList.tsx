import { Suspense } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import RoomLinkSkeleton from '../../skeletons/RoomLink.skeleton'
import { UserRooms } from '../../store/UserRooms'
import RoomLink from '../atoms/RoomLink'

const RoomsLinksList = () => {
  const rooms = useRecoilValueLoadable(UserRooms)
  return (
    <>
        {rooms.getValue() && rooms.getValue()!.map((room) => 
            <Suspense key={room.id + 'skeleton'} fallback={<RoomLinkSkeleton/>}>
                <RoomLink key={room.id} room={room} />
            </Suspense>
        )}
    </>
  )
}

export default RoomsLinksList