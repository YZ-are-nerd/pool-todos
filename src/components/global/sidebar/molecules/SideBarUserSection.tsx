import { BiLogOut } from "react-icons/bi"
import { useRecoilValue } from "recoil"
import { controllerAPI } from "../../../../api/controller.api"
import { SideBarAtom } from "../../../../store/SideBar"
import { User } from "../../../../store/User"
import UserAvatar from "../../UserAvatar"

const SideBarUserSection = () => {
    const user = useRecoilValue(User)
    const wideMode = useRecoilValue(SideBarAtom)
    if (!wideMode) {
        return (
            <div className="w-full h-10 py-1 px-2 mt-auto rounded-xl flex items-center justify-between bg-neutral-800">
                <div className="w-full h-full flex items-center justify-center">
                    <UserAvatar />
                </div>
            </div>
        )
    } else return (
        <div className="w-full h-10 py-1 px-2 mt-auto rounded-xl flex items-center justify-between bg-neutral-800">
            <div className="w-fit h-full flex items-center gap-2">
                <UserAvatar />
                <p className="font-bold text-neutral-300">{user?.username}</p>
            </div>
            <button onClick={controllerAPI.signOut} className="p-1 rounded-md hover:bg-neutral-700"><BiLogOut className="text-neutral-400" size={20}/></button>
        </div>
  )
}

export default SideBarUserSection