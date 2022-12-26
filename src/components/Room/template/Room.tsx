import React, { Suspense, useState } from 'react'
import DesksList from '../../lists/DesksList';
import { Helmet } from 'react-helmet';
import { BiChevronLeft, BiSave, BiTrash } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import TodoDeskSkeleton from '../../../skeletons/TodoDesk.skeleton';
import { controllerAPI } from '../../../api/controller.api';
type Props = {
    roomID: string,
    roomName: string,
}
const Room: React.FC<Props> = ({roomID, roomName}) => {
    const navigate = useNavigate()
    const [renameMode, setRenameMode] = useState<boolean>(false)
    const [headerTitle, setHeaderTitle] = useState<string>(roomName)
    const deleteRoom = async() => {
        await controllerAPI.deleteRoom(roomID)
        navigate('/')
    }
    const updateTitle = async() => {
      await controllerAPI.updateRoomName(roomID, headerTitle)
      setRenameMode(false)
    }
    return (
        <div className='w-full h-full max-w-7xl mx-auto inline-flex flex-col gap-2 items-center justify-center'>
            <Helmet>
                <title>{roomName}</title>
            </Helmet>
            <div className="w-full h-fit flex items-center justify-between border-b border-neutral-700">
                <div className="w-fit h-full flex items-center">
                        <Link to='/'><BiChevronLeft className='text-white' size={24}/></Link>
                        {
                        renameMode ?
                            <div className='w-full h-full py-2 flex items-center gap-1'>
                                <input className='w-full h-full text-4xl font-bold text-white bg-transparent' type='text' value={headerTitle} onChange={e => setHeaderTitle(e.target.value)} />
                                <button onClick={updateTitle} 
                                disabled={roomName === headerTitle ? true : headerTitle.length < 2 ? true : false} 
                                className='p-1 rounded-md bg-neutral-900 bg-opacity-60'><BiSave/></button>
                            </div>
                            :
                            <h3 onDoubleClick={() => setRenameMode(true)} 
                            className="text-4xl font-bold p-2 rounded-xl cursor-pointer hover:bg-neutral-900">{roomName}</h3>
                        }
                </div>
                <button onClick={deleteRoom} className='py-1 px-2 rounded-md flex items-center gap-1 bg-red-500'>
                    <BiTrash size={20}/>
                </button>
            </div>
            <div className="w-full h-full pb-1 inline-flex overflow-x-auto snap-x snap-mandatory rounded-xl">
                <div className="w-fit h-full max-h-full flex items-end lg:items-start shrink-0 gap-x-2">
                    <Suspense fallback={<TodoDeskSkeleton />}>
                        <DesksList roomID={roomID}  />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default Room