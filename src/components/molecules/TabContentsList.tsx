import React from 'react'
import { UserData, User } from '../../store/User';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { Tabs } from '../../store/Tabs';
import TabContent from '../atoms/TabContent';
type Props = {
    user: UserData | null
}
const TabContentsList: React.FC = () => {
    const user = useRecoilValue(User)
    const TabsList = useRecoilValueLoadable(Tabs(user?.id!))
    if (TabsList.state === 'hasValue') {
        return (
            <>
                {
                    TabsList.getValue().map((tab) => <TabContent key={tab.id + 'content'} tab={tab} />)
                }
            </>
        )
    }
    return (
        <div className=""></div>
    )
}

export default TabContentsList