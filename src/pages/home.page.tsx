import { Helmet } from "react-helmet"
import { Tab } from '@headlessui/react'
import { useRecoilValue} from 'recoil';
import { User } from '../store/User';
import TabHeadersList from '../components/molecules/TabHeadersList';
import TabContentsList from '../components/molecules/TabContentsList';
import UserAvatar from '../components/atoms/UserAvatar';
const HomePage = () => {
  return (
    <div className="w-full mx-auto flex flex-col h-full lg:p-4 p-2  max-h-screen">
        <Helmet>
            <title>Домашняя комната</title>
        </Helmet>
        <Tab.Group>
            <Tab.List className='w-full h-fit flex items-center justify-between gap-2'>
                <div className="w-fit max-w-xl h-full flex items-center gap-2">
                    <img className="my-auto w-10 h-10" src="/public/pool/x36/pool_primary.svg" alt="" />
                    <TabHeadersList/>
                </div>
                <div className="w-fit h-full flex items-center gap-2">
                    <UserAvatar />
                </div>
            </Tab.List>
            <Tab.Panels className='w-full h-full rounded-xl p-3 bg-neutral-900'>
                <TabContentsList/>
            </Tab.Panels>
        </Tab.Group>
    </div>
  )
}

export default HomePage