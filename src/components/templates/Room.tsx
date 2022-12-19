import React from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from 'recoil';
import DesksList from '../molecules/DesksList';
import NewDeskTodo from '../molecules/NewDeskTodo';
import { Helmet } from 'react-helmet';
import { DeskTodos } from '../../store/RoomDesks';
import { BiChevronLeft, BiLoaderAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
type Props = {
    roomID: string,
    roomName: string,
}
const Room: React.FC<Props> = ({roomID, roomName}) => {
    const room = useRecoilValueLoadable(DeskTodos(roomID))
    const refresh = useRecoilRefresher_UNSTABLE(DeskTodos(roomID))
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
                    <DesksList refresh={refresh} roomID={roomID} list={room.getValue()!}  />
                    <NewDeskTodo roomID={roomID} />
                </div>
            </div>
        </div>
    )
}

export default Room