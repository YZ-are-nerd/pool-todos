import { BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { controllerAPI } from '../../../../api/controller.api'
import { User } from '../../../../store/User'
import UserAvatar from '../../UserAvatar'

const UserBar = () => {
    const [user, setUser] = useRecoilState(User)
    const navigate = useNavigate()
    const getSignOut = async() => {
        await controllerAPI.signOut()
        setUser(null)
        navigate('/auth')
    }
    return (
        <div className="w-full h-10 py-1 px-2 mt-auto rounded-xl flex items-center justify-between bg-neutral-800">
            <div className="w-fit h-full flex items-center gap-2">
                <UserAvatar />
                <p className="font-bold text-neutral-300">{user?.username}</p>
            </div>
            <button onClick={getSignOut} className="p-1 rounded-md hover:bg-neutral-700"><BiLogOut className="text-neutral-400" size={20}/></button>
        </div>
    )
}

export default UserBar