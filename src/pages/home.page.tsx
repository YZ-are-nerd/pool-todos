import { Helmet } from "react-helmet"
import { BiPlus } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useRecoilValueLoadable } from "recoil"
import { UserRooms } from "../store/UserRooms"
const HomePage = () => {
  const rooms = useRecoilValueLoadable(UserRooms)
  return (
    <div className="w-full h-[90.5vh] rounded-xl p-2 gap-3 flex flex-col overflow-hidden bg-neutral-900">
        <Helmet>
            <title>Домашняя комната</title>
        </Helmet>
        <h1 className="text-xl inline-block mx-auto lg:text-4xl font-bold">Здесь вы найдёте свои комнаты</h1>
        <div className="w-full h-36 pb-1 rounded-xl flex items-center overflow-x-auto">
          <div className="w-fit h-full flex items-center gap-2">
            {rooms.getValue() && rooms.getValue()!.map((room) => 
              <Link to={`/room/${room.id}`} key={room.id}
              className="w-64 h-full rounded-xl flex items-center justify-center cursor-pointer text-xl font-bold text-white bg-neutral-800 hover:bg-opacity-80">{room.title}</Link>
            )}
            <div className="w-64 h-full rounded-xl flex items-center justify-center cursor-pointer text-xl font-bold text-white bg-neutral-800 hover:bg-opacity-80"><BiPlus className="text-white" size={24} /></div>
          </div>
        </div>
    </div>
  )
}

export default HomePage