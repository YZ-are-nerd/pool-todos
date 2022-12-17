import React from 'react'
import { useRecoilValueLoadable } from 'recoil';
import { RoomData } from '../../store/Room';
import DesksList from '../molecules/DesksList';
import { useState } from 'react';
import NewDeskTodo from '../molecules/NewDeskTodo';
type Props = {
    roomID: string,
    roomName: string,
}
const Room: React.FC<Props> = ({roomID, roomName}) => {
    const room = useRecoilValueLoadable(RoomData(roomID))
    if (room.state === 'loading' || !room.getValue()) {
        return (
            <div className='w-full h-full flex flex-col gap-2 items-center justify-center'>
                <div className="w-1/2 h-4 py-2 rounded-xl animate-pulse bg-neutral-900"/>
            </div>
        )
    } 
    if (room.getValue()) {
        return (
            <div className='w-full h-full flex flex-col gap-2 items-center justify-center'>
                <div className="w-full h-fit py-2 flex items-center justify-between border-b border-neutral-700">
                    <h1 className='text-4xl font-bold'>{roomName}</h1>
                    {/* <button className='py-2 px-3 font-semibold text-sm rounded-xl bg-blue-600'>Добавить столбец</button> */}
                </div>
                <div className="w-full h-full gap-2 flex">
                    <DesksList list={room.getValue()!}  />
                    <NewDeskTodo roomID={roomID} />
                </div>
            </div>
        )
    }
    return <div className="w-full h-full flex items-center justify-center">
        <p>Что-то не так!!!</p>
    </div>
}

export default Room