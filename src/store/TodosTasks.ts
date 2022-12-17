import { selectorFamily } from 'recoil';
import { controllerAPI } from '../api/controller.api';

export interface ITodosTasks {
    id: string,
    title: string,
    state: boolean,
    createdAt: string
}
export const TodosTasks = selectorFamily({
    key: 'TodosTasks',
    get: (deskID: string) => async() => {
        const tasks = await controllerAPI.getTodosByDeskID(deskID)
        console.log(tasks);
        if (tasks) return tasks
        return [] as ITodosTasks[]
    }
})

