import { Suspense, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Room from '../components/Room/template/Room'
import RoomSkeleton from '../skeletons/Room.skeleton'
import { User } from '../store/User'
import { UserRoom } from '../store/UserRoom'

const RoomPage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const user = useRecoilValue(User)
    const room = useRecoilValue(UserRoom(params && params.roomID!))
    useEffect(() => {
        if (user?.id !== room.room_owner) navigate('/')
    },[])
    return (
        <Suspense fallback={<RoomSkeleton />}>
            <Room roomID={room.id} roomName={room.title} />
        </Suspense>
    )
}

export default RoomPage