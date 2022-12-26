const HomePageSkeleton = () => {
  return (
    <div className="w-full h-full rounded-xl p-2 gap-3 flex flex-col">
        <div className="max-w-7xl w-full h-full mx-auto gap-6 flex">
          <div className="w-full h-fulll flex flex-col gap-4">
            <div className="w-full h-fit flex items-center justify-between">
                <div className="w-1/3 h-4 rounded-xl animate-pulse bg-neutral-900"/>
                <div className="w-12 h-4 rounded-xl animate-pulse bg-neutral-900"/>
            </div>
            <div className="w-full h-8 flex items-center justify-between gap-2">
                <div className="w-full h-full rounded-xl bg-neutral-800"/>
                <div className="w-full h-full rounded-xl bg-neutral-800"/>
                <div className="w-full h-full rounded-xl bg-neutral-800"/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default HomePageSkeleton