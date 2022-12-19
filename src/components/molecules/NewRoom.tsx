import React, { useState } from 'react'
import { BiPlus, BiX } from 'react-icons/bi'
import NewTab from '../templates/NewTab'
type Props = {
    refresh: () => void
}
const NewRoom: React.FC<Props> = ({refresh}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const modeOff = () => {
      setEditMode(false)
      refresh()
    }
    return (
        <div onClick={() => setEditMode(!editMode)}  className="w-80 lg:w-96 h-full relative rounded-xl flex items-center justify-center cursor-pointer text-xl font-bold text-white bg-neutral-800 hover:bg-opacity-80">
            {
            editMode ? 
            <NewTab modeOff={modeOff} />
            : <BiPlus className="text-white" size={24} />
            }
            {
                editMode &&
                <div onClick={() => setEditMode(false)} 
                className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center bg-neutral-900"><BiX/></div>
            }
        </div>
    )
}

export default NewRoom