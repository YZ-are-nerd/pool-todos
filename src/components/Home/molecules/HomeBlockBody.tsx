import { Suspense } from 'react'
import RoomLinkSkeleton from '../../../skeletons/RoomLink.skeleton'
import RoomsLinksList from '../../lists/RoomsLinksList'

const HomeBlockBody = () => {
  return (
    <div className="w-full h-full pb-1 rounded-xl flex items-center overflow-x-auto">
        <div className="w-fit h-full flex items-center gap-2">
            <Suspense fallback={<RoomLinkSkeleton/>}>
                <RoomsLinksList />
            </Suspense>
        </div>
    </div>
  )
}

export default HomeBlockBody