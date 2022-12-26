const TodoDeskSkeleton = () => {
  return (
    <div className="w-[370px] lg:w-3/12 h-full snap-always snap-center shrink-0 rounded-xl p-2 gap-2 flex flex-col bg-neutral-800">
        <div className="w-1/2 h-4 rounded-xl bg-neutral-700 animate-pulse"></div>
        <div className="w-full h-full flex flex-col  gap-2">
            <div className="w-full h-10 rounded-xl bg-neutral-700 animate-pulse"/>
            <div className="w-full h-10 rounded-xl bg-neutral-700 animate-pulse"/>
            <div className="w-full h-10 rounded-xl bg-neutral-700 animate-pulse"/>
        </div>
    </div>
  )
}

export default TodoDeskSkeleton