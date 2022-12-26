import { Suspense, useLayoutEffect } from "react"
import { BiFolder, BiPlus } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useRecoilCallback, useRecoilValue } from "recoil"
import { supabase } from "../../../../api/client"
import { controllerAPI } from "../../../../api/controller.api"
import { User } from "../../../../store/User"
import { UserRooms } from "../../../../store/UserRooms"
import SideBarButton from "../atoms/SideBarButton"

const SideBarRoomsList = () => {
    const user = useRecoilValue(User)
    const rooms = useRecoilValue(UserRooms(user?.id!))
    const changeWatcher = useRecoilCallback(({snapshot, set}) => async () => {
        const rooms = await controllerAPI.getRoomsByUserID(user?.id!)
        const snap = snapshot.getLoadable(UserRooms(user?.id!))
        if (rooms?.length !== snap.getValue()?.length) {
          set(UserRooms(user?.id!), rooms)
        }
      })
      useLayoutEffect(() => {
        supabase
        .channel(`public:rooms:room_owner=eq.${user?.id}2`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms', filter: `room_owner=eq.${user?.id}` }, payload => {
          if (payload.eventType === 'DELETE' || payload.eventType === 'INSERT') {
            changeWatcher()
          }
        })
        .subscribe()
      },[])
    if (rooms && rooms.length === 0) {
      return (
        <div className="w-full h-fit flex items-center justify-center">
          <Link to='/rooms' className="w-full h-fit px-2 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer bg-neutral-800 hover:bg-opacity-80">
            <BiPlus className="text-neutral-400" size={20} />
          </Link>
        </div>
      )
    } else return (
        <>{
            rooms && rooms.map((room) => 
            <Suspense key={room.id + 'sideSkeleton'} fallback={<></>}>
                <SideBarButton key={room.id} link={`/room/${room.id}`} title={room.title} icon={<BiFolder className="text-neutral-400" size={18} />} />
            </Suspense>
        )}</>
    )
}

export default SideBarRoomsList