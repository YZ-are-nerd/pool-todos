import { useRecoilValueLoadable } from 'recoil';
import { User } from '../../store/User';

const UserAvatar = () => {
    const user = useRecoilValueLoadable(User)
    if (user.state === 'loading') {
        return <div className="w-9 h-9 rounded-full animate-pulse bg-neutral-900"/>
    } else {
        return (
            <img className="w-9 h-9 rounded-full bg-neutral-900" src={user.getValue()?.avatar} />
        )
    }
}

export default UserAvatar