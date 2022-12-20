import React, { useEffect } from 'react'
import { useRecoilValueLoadable, useRecoilRefresher_UNSTABLE } from 'recoil'
import { supabase } from '../../api/client'
import { controllerAPI } from '../../api/controller.api'
import { IDeskTodos } from '../../api/types'
import { TodosTasks } from '../../store/TodoList'
import NewTodo from '../molecules/NewTodo'
import TodoDeskToolBar from '../molecules/TodoDeskToolBar'
import TodoList from '../molecules/TodoList'
type Props = {
    deskID: string,
    data: IDeskTodos
  }
const TodoDeskBody: React.FC<Props> = ({deskID, data}) => {
    const tasksList = useRecoilValueLoadable(TodosTasks(deskID))
    const refresh = useRecoilRefresher_UNSTABLE(TodosTasks(deskID))
    const checkAll = async() => {
      if (tasksList.getValue().unCheckedList && tasksList.getValue().unCheckedList?.length !== 0) {
        tasksList.getValue().unCheckedList!.forEach(async(todo) => {
          await controllerAPI.updateTodoState(todo.id, true)
        });
        setTimeout(() => {
          refresh()          
        }, 1000);
      }
    }
    const deleteChecked = async() => {
      if (tasksList.getValue().checkedList && tasksList.getValue().checkedList?.length !== 0) {
        tasksList.getValue().checkedList!.forEach(async(todo) => {
          await controllerAPI.deleteTodo(todo.id)
        });
        setTimeout(() => {
          refresh()          
        }, 1000);
      }
    }
    useEffect(() => {
      supabase
      .channel(`public:todo:ref_to_desk=eq.${deskID}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todo', filter: `ref_to_desk=eq.${deskID}` }, payload => {
        if (payload.eventType === 'DELETE' || payload.eventType === 'INSERT') {
          refresh()
        }
      })
      .subscribe()
    },[])
    return (
      <>
        <div onContextMenu={e => e.stopPropagation()} className="w-full h-full overflow-y-auto">
          <div className="w-full h-fit flex flex-col shrink-0">
            <div className="w-full h-full flex flex-col overflow-x-auto gap-2">
              <NewTodo deskID={deskID} />
              <TodoList deskID={deskID} list={tasksList.getValue().unCheckedList!} />
              <TodoList deskID={deskID} list={tasksList.getValue().checkedList!} />
            </div>
          </div>
        </div>
        <TodoDeskToolBar deleteChecked={deleteChecked} checkAll={checkAll} data={data} />
      </>

    )
}

export default TodoDeskBody