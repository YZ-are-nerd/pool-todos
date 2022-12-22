import { Suspense } from 'react'
import RoomLinkSkeleton from '../../../skeletons/RoomLink.skeleton'
import RoomsLinksList from '../../lists/RoomsLinksList'

const HomeBlockBody = () => {
  return (
    <div className="w-full h-full pb-1 rounded-xl flex flex-wrap justify-center items-start gap-2 overflow-y-visible">
      <Suspense fallback={<RoomLinkSkeleton/>}>
          <RoomsLinksList />
      </Suspense>
    </div>
  )
}

export default HomeBlockBody