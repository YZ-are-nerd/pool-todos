import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Room from '../components/templates/Room'
import RoomSkeleton from '../skeletons/Room.skeleton'
import { UserRoom } from '../store/UserRoom'

const RoomPage = () => {
    const params = useParams()
    const room = useRecoilValue(UserRoom(params && params.roomID!))
    return (
        <Suspense fallback={<RoomSkeleton />}>
            <Room roomID={room.id} roomName={room.title} />
        </Suspense>
    )
}

export default RoomPage