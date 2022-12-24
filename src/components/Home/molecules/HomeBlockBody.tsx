import { Suspense } from 'react'
import RoomLinkSkeleton from '../../../skeletons/RoomLink.skeleton'
import RoomsLinksList from '../../lists/RoomsLinksList'

const HomeBlockBody = () => {
  return (
    <div className="w-full h-full pb-1 rounded-xl grid grid-cols-1 grid-rows-6 lg:grid-rows-1 lg:grid-cols-3 gap-2 overflow-y-visible">
      <Suspense fallback={<RoomLinkSkeleton/>}>
          <RoomsLinksList />
      </Suspense>
    </div>
  )
}

export default HomeBlockBody