import { useState } from 'react';
import { controllerAPI } from '../../api/controller.api';
import { useRecoilValue } from 'recoil';
import { User } from '../../store/User';
const NewTab = () => {
    const user = useRecoilValue(User)
    const [roomName, setRoomName] = useState<string>('')
    const setNewRoom = async() => {
        if (user) await controllerAPI.addNewRoom(roomName, user.id)
    }
    return (
        <div className='w-full h-full flex items-end lg:items-center justify-center'>
            <div className="w-full max-w-xl max-h-64 h-full p-2 rounded-xl mx-auto flex flex-col gap-2 bg-neutral-800">
                <div className="w-full h-full flex flex-col">
                    <div className="w-full h-fit flex gap-2 items-start justify-between">
                        <div className="w-full h-fit gap-1 flex flex-col">
                            <h1 className="text-4xl font-bold">Создайте свою комнату</h1>
                            <p className="leading-5 text-neutral-400">Личная комната. Личные дела. Следите за ходом выполнения дел, 
                            создавайте больше комнат и много другое.</p>
                        </div>
                        <img className="h-36 hidden lg:inline" src="/img/new_room_img.svg" alt="" />
                    </div>
                    <div className="w-full h-fit flex flex-col mt-2">
                        <input value={roomName} onChange={e => setRoomName(e.target.value)} placeholder="Назовите свою комнату" 
                        className="font-semibold rounded-xl text-xl py-1 px-2 border-2 text-neutral-300 border-neutral-900 focus:border-blue-600 bg-transparent" type="text" name="" id="" />
                    </div>
                    <div className="w-full h-fit flex gap-2 items-center mt-auto">
                        <button onClick={() => setRoomName('')}
                        className="w-full p-2 rounded-xl font-bold bg-neutral-900">Очистить</button>
                        <button disabled={roomName.length < 2 ? true : false} onClick={setNewRoom}
                        className="w-full p-2 rounded-xl font-bold bg-blue-600 disabled:bg-neutral-700">Создать</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewTab