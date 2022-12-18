import { Tab } from '@headlessui/react';
import { ITabs } from '../../store/Tabs';
type Props = {
  tab: ITabs
}
const TabContent: React.FC<Props> = ({tab}) => {
  return (
    <Tab.Panel className='w-full h-full gap-2 flex flex-col rounded-xl px-3 bg-neutral-900'>
      {tab.content}
    </Tab.Panel>
  )
}

export default TabContent