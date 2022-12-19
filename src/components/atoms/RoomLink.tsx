import React from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { IRoom } from '../../api/types'
import { RoomStat } from '../../store/RoomStat'
import ListStatCard from './ListStatCard'
type Props = {
    room: IRoom
}
const RoomLink: React.FC<Props> = ({room}) => {
  const stat = useRecoilValue(RoomStat(room.id))
  return (
    <Link to={`/room/${room.id}`}
    className="w-96 h-full rounded-xl flex flex-col gap-2 p-2 cursor-pointer text-xl font-bold text-white bg-neutral-800 hover:bg-opacity-80">
      <div className="w-full h-fit flex items-center justify-between">
        <h3 className='text-2xl font-bold'>{room.title}</h3>
        <button className='p-1'><BiLinkExternal/></button>
      </div>
      <div className="w-full h-full py-1 flex gap-2 overflow-x-auto">
        {
          stat.lists.listsData.map((list) => <ListStatCard key={list.id} list={list} />)
        }
      </div>

    </Link>
  )
}

export default RoomLink