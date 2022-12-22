import React, { useEffect } from 'react'
import { useRecoilValueLoadable, useRecoilRefresher_UNSTABLE, useRecoilCallback, useRecoilValue } from 'recoil'
import { supabase } from '../../../api/client'
import { controllerAPI } from '../../../api/controller.api'
import { IDeskTodos } from '../../../api/types'
import { TodoListAtom } from '../../../store/TodoList'
import TodoList from '../../lists/TodoList'
import NewTodo from '../../modals/NewTodo'
import TodoDeskToolBar from './TodoDeskToolBar'
type Props = {
    deskID: string,
    data: IDeskTodos
  }
const TodoDeskBody: React.FC<Props> = ({deskID, data}) => {
    const tasksList = useRecoilValue(TodoListAtom(deskID))
    const refresh = useRecoilRefresher_UNSTABLE(TodoListAtom(deskID))
    const changeWatcher = useRecoilCallback(({snapshot, set}) => async () => {
      const tasks = await controllerAPI.getTodosByDeskID(deskID)
      const snap = snapshot.getLoadable(TodoListAtom(deskID))
      if (tasks) {
        if (snap.getValue().list?.length !== tasks?.length) {
          const checkedList = tasks.filter(t => t.state === true)
          const unCheckedList = tasks.filter(t => t.state === false)
          set(TodoListAtom(deskID), {list: tasks, checkedList: checkedList, unCheckedList: unCheckedList})
        }
        const checkedList = tasks.filter(t => t.state === true)
        const unCheckedList = tasks.filter(t => t.state === false)
        set(TodoListAtom(deskID), {list: tasks, checkedList: checkedList, unCheckedList: unCheckedList})
      }
    })
    const checkAll = async() => {
      if (tasksList.unCheckedList && tasksList.unCheckedList?.length !== 0) {
        tasksList.unCheckedList!.forEach(async(todo) => {
          await controllerAPI.updateTodoState(todo.id, true)
        });
        setTimeout(() => {
          refresh()          
        }, 1000);
      }
    }
    const deleteChecked = async() => {
      if (tasksList.checkedList && tasksList.checkedList?.length !== 0) {
        tasksList.checkedList!.forEach(async(todo) => {
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
          changeWatcher()
        }
      })
      .subscribe()
    },[])
    return (
      <>
        <div onContextMenu={e => {e.stopPropagation(); changeWatcher()}} className="w-full h-full overflow-y-auto">
          <div className="w-full h-fit flex flex-col shrink-0">
            <div className="w-full h-full flex flex-col overflow-x-auto gap-2">
              <NewTodo deskID={deskID} />
              <TodoList changeWatcher={changeWatcher} deskID={deskID} list={tasksList.unCheckedList!} />
              <TodoList changeWatcher={changeWatcher} deskID={deskID} list={tasksList.checkedList!} />
            </div>
          </div>
        </div>
        <TodoDeskToolBar deleteChecked={deleteChecked} checkAll={checkAll} data={data} />
      </>

    )
}

export default TodoDeskBody