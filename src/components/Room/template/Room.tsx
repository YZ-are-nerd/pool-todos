import React, { Suspense } from 'react'
import DesksList from '../../lists/DesksList';
import NewDeskTodo from '../../modals/NewDeskTodo';
import { Helmet } from 'react-helmet';
import { BiChevronLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import TodoDeskSkeleton from '../../../skeletons/TodoDesk.skeleton';
type Props = {
    roomID: string,
    roomName: string,
}
const Room: React.FC<Props> = ({roomID, roomName}) => {
    return (
        <div className='w-full h-full max-h-full inline-flex flex-col gap-2 items-center justify-center'>
            <Helmet>
                <title>{roomName}</title>
            </Helmet>
            <div className="w-full h-fit flex items-center justify-between border-b border-neutral-700">
                <div className="w-fit h-full flex items-center">
                    <Link to='/'><BiChevronLeft className='text-white' size={24}/></Link>
                    <h1 className='text-4xl font-bold p-2 rounded-xl cursor-pointer hover:bg-neutral-900'>{roomName}</h1>
                </div>
            </div>
            <div className="w-full h-full pb-1 inline-flex overflow-x-auto snap-x snap-mandatory">
                <div className="w-fit min-w-full h-full max-h-full flex items-end lg:items-start shrink-0 gap-x-2">
                    <Suspense fallback={<TodoDeskSkeleton />}>
                        <DesksList roomID={roomID}  />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default Room