import { DateTime } from 'luxon'
import React from 'react'
import { BiFolder, BiLinkExternal } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { IRoom } from '../../../api/types'
type Props = {
    room: IRoom
}
const RoomLink: React.FC<Props> = ({room}) => {
  return (
    <Link to={`/room/${room.id}`}
    className="w-full h-full rounded-xl flex flex-col gap-0 p-2 cursor-pointer text-xl font-bold border-2 text-white border-neutral-800 bg-neutral-900 hover:bg-opacity-80">
      <div className="w-full h-fit gap-2 flex items-start justify-between">
        <BiFolder className='mt-0.5' size={24} />
        <div className="w-full h-fit flex flex-col gap-1">
          <h3 className='text-lg font-bold flex gap-2 items-center'>{room.title}</h3>
        </div>
        <button className='p-1'><BiLinkExternal/></button>
      </div>
      <div className="w-full h-fit flex mt-auto">
        <p className='text-xs text-neutral-500'>{DateTime.fromISO(room.created_at).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</p>
      </div>
    </Link>
  )
}

export default RoomLink