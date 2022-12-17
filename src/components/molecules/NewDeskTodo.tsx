import { BiPlus } from 'react-icons/bi';
import { useState } from 'react';
import { controllerAPI } from '../../api/controller.api';

type Props = {
    roomID: string
}
const NewDeskTodo: React.FC<Props> = ({roomID}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [listName, setListName] = useState<string>('')
    const addList = async() => {
        await controllerAPI.addListInRoom(roomID, listName)
        setListName('')
        setEditMode(false)
    }
    if (editMode) {
        return (
            <div onClick={() => setEditMode(!editMode)} className="w-3/12 h-fit shrink-0 rounded-xl flex flex-col p-2 bg-neutral-800">
                <div onClick={e => e.stopPropagation()} className="w-full h-full flex flex-col gap-2">
                    <h1 className='text-4xl font-bold'>Новый список</h1>
                    <input placeholder="Как назовете список?" value={listName} onChange={e => setListName(e.target.value)}
                    className="font-semibold rounded-xl text-xl py-1 px-2 border-2 text-neutral-300 border-neutral-900 focus:border-blue-600 bg-transparent" type="text" name="" id="" />
                    <div className="w-full h-fit flex gap-2 items-center mt-auto">
                        <button onClick={() => setEditMode(false)}
                        className="w-full p-2 rounded-xl font-bold bg-neutral-900">Отменить</button>
                        <button 
                        disabled={listName.length < 2 ? true : false} onClick={() => addList()}
                        className="w-full p-2 rounded-xl font-bold bg-blue-600 disabled:bg-neutral-700">Создать</button>
                    </div>
                </div>
            </div>
        )
    } else return (
        <div onClick={() => setEditMode(!editMode)} className="w-3/12 h-full shrink-0 cursor-pointer gap-1 rounded-xl flex items-center justify-center bg-neutral-800">
            <BiPlus className='text-white' size={20}/>
            <p className='font-semibold text-sm'>Добавить новый столбец</p>
        </div>
    )
}

export default NewDeskTodo