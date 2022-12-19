import React, { Suspense, useState } from 'react'
import { BiPlus, BiX } from 'react-icons/bi'
import RoomLinkSkeleton from '../../skeletons/RoomLink.skeleton'
import NewTab from '../templates/NewTab'
import RoomsLinksList from './RoomsLinksList'

const HomeBlockBody = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  return (
    <div className="w-full h-full pb-1 rounded-xl flex items-center overflow-x-auto">
        <div className="w-fit h-full flex items-center gap-2">
            <Suspense fallback={<RoomLinkSkeleton/>}>
                <RoomsLinksList />
            </Suspense>
            <div onClick={() => setEditMode(!editMode)}  className="w-96 h-full relative rounded-xl flex items-center justify-center cursor-pointer text-xl font-bold text-white bg-neutral-800 hover:bg-opacity-80">
                {
                editMode ? 
                <NewTab />
                : <BiPlus className="text-white" size={24} />
                }
                {
                    editMode &&
                    <div onClick={() => setEditMode(false)} 
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center bg-neutral-900"><BiX/></div>
                }
            </div>
        </div>
    </div>
  )
}

export default HomeBlockBody