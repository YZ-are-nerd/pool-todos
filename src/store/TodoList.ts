import { atomFamily, selectorFamily } from 'recoil';
import { controllerAPI } from '../api/controller.api';
import { ITodosTasks } from '../api/types';
type TasksList = {
    checkedList: ITodosTasks[], 
    unCheckedList: ITodosTasks[], 
    list: ITodosTasks[]
}
export const TodoListAtom = atomFamily<TasksList, string>({
    key: 'todoListAtom',
    default: selectorFamily({
        key: 'TodosTasks',
        get: (deskID: string) => async() => {
            const tasks = await controllerAPI.getTodosByDeskID(deskID)
            console.log(tasks);
            if (tasks) {
                const checkedList = tasks.filter(t => t.state === true)
                const unCheckedList = tasks.filter(t => t.state === false)
                const data: TasksList = {
                    checkedList: checkedList, 
                    unCheckedList: unCheckedList, 
                    list: tasks
                }
                return data
            }
            const data: TasksList = {
                checkedList: [], 
                unCheckedList: [], 
                list: []
            }
            return data
        }
    })
})
