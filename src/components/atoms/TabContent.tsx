import { Tab } from '@headlessui/react';
import { ITabs } from '../../store/Tabs';
type Props = {
  tab: ITabs
}
const TabContent: React.FC<Props> = ({tab}) => {
  return (
    <Tab.Panel className='w-full h-full gap-2 flex flex-col'>
      {tab.content}
        {/* <div className="w-full h-fit flex items-center gap-2">
            <h2 className="text-3xl font-bold">На сегодня</h2>
        </div>
        <hr className="border-neutral-700" />
        <div className="w-full h-full flex gap-2 py-1 overflow-x-auto">
            <DesksList />
            <div className="w-3/12 shrink-0 h-full rounded-xl flex gap-1 items-center justify-center bg-neutral-800">
                <BiPlus className="text-white" size={24} />
                <p className="font-bold">Добавить список</p>
            </div>
        </div> */}
    </Tab.Panel>
  )
}

export default TabContent