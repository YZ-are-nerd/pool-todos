import TodoDeskSkeleton from "./TodoDesk.skeleton"

const RoomSkeleton = () => {
  return (
    <div className='w-full h-full max-h-[91vh] inline-flex flex-col gap-2 items-center justify-center'>
        <div className="w-full h-fit flex items-center justify-between border-b border-neutral-700">
            <div className="w-1/3 h-4 rounded-xl bg-neutral-900 animate-pulse"></div>
        </div>
        <div className="w-full h-full pb-1 inline-flex overflow-x-auto snap-x snap-mandatory">
            <div className="w-fit min-w-full h-full max-h-full flex items-end lg:items-start shrink-0 gap-x-2">
                <TodoDeskSkeleton />
            </div>
        </div>
    </div>
  )
}

export default RoomSkeleton