import React, { Suspense, useEffect } from 'react'
import { useRecoilValue, useRecoilCallback } from 'recoil'
import { supabase } from '../../api/client'
import { controllerAPI } from '../../api/controller.api'
import { TodosByDesk } from '../../store/Statistics'
import { TodoListAtom } from '../../store/TodoList'
import TodoList from './TodoList'
type Props = {
  deskData: TodosByDesk,
}
const NotCheckedTodoList: React.FC<Props> = ({deskData}) => {
  const tasksList = useRecoilValue(TodoListAtom(deskData.deskID))
  const changeWatcher = useRecoilCallback(({snapshot, set}) => async () => {
    const tasks = await controllerAPI.getTodosByDeskID(deskData.deskID)
    const snap = snapshot.getLoadable(TodoListAtom(deskData.deskID))
    if (tasks) {
      if (snap.getValue().list?.length !== tasks?.length) {
        const checkedList = tasks.filter(t => t.state === true)
        const unCheckedList = tasks.filter(t => t.state === false)
        set(TodoListAtom(deskData.deskID), {list: tasks, checkedList: checkedList, unCheckedList: unCheckedList})
      }
      const checkedList = tasks.filter(t => t.state === true)
      const unCheckedList = tasks.filter(t => t.state === false)
      set(TodoListAtom(deskData.deskID), {list: tasks, checkedList: checkedList, unCheckedList: unCheckedList})
    }
  })
  useEffect(() => {
    supabase
    .channel(`public:todo:ref_to_desk=eq.${deskData.deskID}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'todo', filter: `ref_to_desk=eq.${deskData.deskID}` }, payload => {
      if (payload.eventType === 'DELETE' || payload.eventType === 'INSERT') {
        changeWatcher()
      }
    })
    .subscribe()
  },[])
    return <TodoList changeWatcher={changeWatcher} deskID={deskData.deskID} list={deskData.todos} />
}

export default NotCheckedTodoList