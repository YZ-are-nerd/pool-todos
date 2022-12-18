import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Room from '../components/templates/Room'
import { UserRoom } from '../store/UserRoom'

const RoomPage = () => {
    const params = useParams()
    const room = useRecoilValue(UserRoom(params && params.roomID!))
    console.log(params);
    return (
        <Room roomID={room.id} roomName={room.title} />
    )
}

export default RoomPage