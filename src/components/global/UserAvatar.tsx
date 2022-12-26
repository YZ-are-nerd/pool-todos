import { useRecoilValueLoadable } from 'recoil';
import { User } from '../../store/User';

const UserAvatar = () => {
    const user = useRecoilValueLoadable(User)
    if (user.state === 'loading') {
        return <div className="w-8 h-8 rounded-full shrink-0 animate-pulse bg-neutral-900"/>
    } else {
        return (
            <img className="w-8 h-8 rounded-full shrink-0 bg-neutral-900" src={user.getValue()?.avatar} />
        )
    }
}

export default UserAvatar