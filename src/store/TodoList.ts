import { selector, selectorFamily } from 'recoil';
import { controllerAPI } from '../api/controller.api';
import { ITodosTasks } from '../api/types';


export const TodosTasks = selectorFamily({
    key: 'TodosTasks',
    get: (deskID: string) => async() => {
        const tasks = await controllerAPI.getTodosByDeskID(deskID)
        console.log(tasks);
        if (tasks) {
            const checkedList = tasks.filter(t => t.state === true)
            const unCheckedList = tasks.filter(t => t.state === false)
            return {checkedList: checkedList, unCheckedList: unCheckedList, list: tasks}
        }
        return {checkedList: null, unCheckedList: null, list: null}
    }
})
