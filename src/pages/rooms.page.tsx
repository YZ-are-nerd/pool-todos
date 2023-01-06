import { Suspense, useEffect } from "react"
import { BiChevronLeft } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import RoomsLinksList from "../components/lists/RoomsLinksList"
import RoomsList from "../components/Rooms/lists/RoomsList"
import { User } from "../store/User"

const RoomsPage = () => {
  const user = useRecoilValue(User)
  const navigate = useNavigate()
  useEffect(() => {
    console.log('home', user);
    if (!user) navigate('/auth');
  },[user])
  return (
    <div className='w-full h-full flex flex-col'>
      <div className="max-w-7xl w-full h-full mx-auto flex flex-col gap-2">
        <div className="w-fit h-fit flex items-center">
          <Link to='/'><BiChevronLeft className='inline lg:hidden text-white' size={24}/></Link>
          <h1 className='text-4xl font-bold'>Папки</h1>
        </div>
        <div className="w-full h-full py-1 grid lg:grid-cols-4 lg:grid-rows-6 gap-2">
          <Suspense fallback={<RoomsLinksList />}>
            <RoomsList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default RoomsPage