import React from 'react'
import { useRecoilValue } from 'recoil'
import { IDeskTodos } from '../../api/types'
import { ListStat } from '../../store/RoomStat'
type Props = {
    list: IDeskTodos
}
const ListStatCard: React.FC<Props> = ({list}) => {
    const stats = useRecoilValue(ListStat(list.id))
    const checkedTodos = stats.todos.todosData.filter(t => t.state === true)
    const percents = (checkedTodos.length / stats.todos.todosData.length) * 100 || 0
    return (
        <div className="w-64 h-full flex flex-col shrink-0 rounded-xl p-2 gap-1 bg-neutral-800">
            <h5 className='shrink-0 line-clamp-1'>{list.title}</h5>
            <div className="w-full h-full flex items-center gap-2">
                <div className="w-1/2 h-full flex flex-col p-2 gap-2 rounded-xl bg-neutral-700 bg-opacity-75">
                    <p className='text-sm font-medium text-neutral-400'>Всего</p>
                    <p className='font-bold text-4xl'>{stats.todos.count}</p>
                </div>
                <div className="w-1/2 h-full flex flex-col p-2 gap-2 rounded-xl bg-neutral-700 bg-opacity-75">
                    <p className='text-sm font-medium text-neutral-400'>Выполненные</p>
                    <p className='font-bold text-4xl'>{checkedTodos.length}</p>
                </div>
            </div>
            <div className="w-full shrink-0 h-2 mt-auto rounded-full bg-blue-600 bg-opacity-40">
                <div style={{width: `${percents}%`}} className="w-4 h-full rounded-full bg-blue-600"></div>
            </div>       
        </div>
    )
}

export default ListStatCard