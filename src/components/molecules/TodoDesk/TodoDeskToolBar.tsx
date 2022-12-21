import { DateTime } from 'luxon'
import { BiCheckDouble, BiListMinus, BiTrash } from 'react-icons/bi'
import { controllerAPI } from '../../../api/controller.api'
import { IDeskTodos } from '../../../api/types'
type Props = {
    data: IDeskTodos,
    checkAll: () => void,
    deleteChecked: () => void
}
const TodoDeskToolBar: React.FC<Props> = ({data, checkAll, deleteChecked}) => {
  return (
    <div className="w-full h-fit max-h-12 flex items-center gap-1 rounded-xl">
        <div className="w-fit h-fit flex items-center">
          <button onClick={checkAll} className='py-1 px-2 rounded-l-md flex items-center gap-1 bg-neutral-600'>
            <BiCheckDouble size={20}/>
          </button>
          <div className="w-0.5 h-full"/>
          <button onClick={deleteChecked} className='py-1 px-2 rounded-r-md flex items-center gap-1 bg-neutral-600'>
            <BiListMinus size={20}/>
          </button>
        </div>
        <button onClick={() => controllerAPI.deleteDeskTodo(data.id)} 
        className='py-1 px-2 rounded-md flex items-center gap-1 bg-red-500'>
          <BiTrash size={20}/>
        </button>
        <p className='ml-auto select-none text-sm font-semibold text-neutral-400'>
          Создан: {DateTime.fromISO(data.created_at).toLocaleString(DateTime.DATETIME_SHORT)}
        </p>
    </div>
  )
}

export default TodoDeskToolBar