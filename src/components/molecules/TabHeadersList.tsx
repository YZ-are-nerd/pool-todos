import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Tabs } from '../../store/Tabs';
import { User, UserData } from '../../store/User';
import TabHeader from '../atoms/TabHeader';
type Props = {
    user: UserData | null
}
const TabHeadersList: React.FC = () => {
    const user = useRecoilValue(User)
    const TabsList = useRecoilValueLoadable(Tabs(user?.id!))
    if (TabsList.state === 'hasValue') {
        return (
            <div className="max-w-xs w-fit h-full flex items-center gap-2 overflow-x-auto">
                {
                    TabsList.getValue().map((tab) => <TabHeader key={tab.id + 'header'} tab={tab} />)
                }
            </div>
        )
    }
    return (
        <div></div>
    )

}

export default TabHeadersList