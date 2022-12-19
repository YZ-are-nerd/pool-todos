import { DateTime } from 'luxon'
import { BiCheckDouble, BiPencil, BiTrash } from 'react-icons/bi'
import { controllerAPI } from '../../api/controller.api'
import { IDeskTodos } from '../../api/types'
type Props = {
    data: IDeskTodos,
    checkAll: () => void
}
const TodoDeskToolBar: React.FC<Props> = ({data, checkAll}) => {
  return (
    <div className="w-full h-fit max-h-12 flex items-center gap-1 rounded-xl">
        <button onClick={checkAll} className='py-1 px-2 rounded-md flex items-center gap-1 bg-neutral-600'>
        <BiCheckDouble size={20}/>
        </button>
        <button className='py-1 px-2 rounded-md flex items-center gap-1 bg-neutral-600'>
        <BiPencil size={20}/>
        </button>
        <button onClick={() => controllerAPI.deleteDeskTodo(data.id)} className='py-1 px-2 rounded-md flex items-center gap-1 bg-neutral-600'>
        <BiTrash size={20}/>
        </button>
        <p className='ml-auto text-sm font-semibold text-neutral-400'>{DateTime.fromISO(data.created_at).toLocaleString(DateTime.DATETIME_SHORT)}</p>
    </div>
  )
}

export default TodoDeskToolBar