import React from 'react'
import { BiFolder, BiLinkExternal } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { IRoom } from '../../../api/types'
import { RoomStat } from '../../../store/RoomStat'
import ListStatCard from './ListStatCard'
type Props = {
    room: IRoom
}
const RoomLink: React.FC<Props> = ({room}) => {
  const stat = useRecoilValue(RoomStat(room.id))
  return (
    <Link to={`/room/${room.id}`}
    className="w-full h-fit rounded-xl flex flex-col gap-0 p-2 cursor-pointer text-xl font-bold border-2 text-white border-neutral-800 bg-neutral-900 hover:bg-opacity-80">
      <div className="w-full h-fit gap-2 flex items-start justify-between">
        <BiFolder className='mt-0.5' size={24} />
        <div className="w-full h-fit flex flex-col gap-1">
          <h3 className='text-lg font-bold flex gap-2 items-center'>{room.title}<span className='text-blue-500'>({stat.roomStat.count})</span></h3>
        </div>
        <button className='p-1'><BiLinkExternal/></button>
      </div>
      {/* {
        stat.lists.count !== 0
        ?
        <div className="w-full max-h-full mt-auto py-1 flex gap-2 overflow-x-auto">
          {
            stat.lists.listsData.map((list) => <ListStatCard key={list.id} list={list} />)
          }
        </div>
        : <div className="w-full h-full flex items-center justify-center rounded-xl border-2 border-dashed border-neutral-800"><p className='text-sm text-neutral-500'>Нет списков - нет статистики</p></div>
      } */}
    </Link>
  )
}

export default RoomLink