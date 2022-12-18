import React from 'react'
import { Tab } from '@headlessui/react';
import { BiHome } from 'react-icons/bi';
import { ITabs } from '../../store/Tabs';
type Props = {
  tab: ITabs
}
const TabHeader: React.FC<Props> = ({tab}) => {
  return (
    <Tab className={({selected }) => `flex items-center gap-1 py-2 px-4 rounded-xl font-semibold rounded-b-none 
    ${selected ? 'bg-neutral-900 hover:bg-neutral-800' : ''} hover:bg-neutral-900 hover:bg-opacity-50`}>
       {tab.title}
    </Tab>
  )
}

export default TabHeader