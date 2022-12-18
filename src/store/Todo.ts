import { selectorFamily } from 'recoil';
import { controllerAPI } from '../api/controller.api';
export const Todo = selectorFamily({
    key: 'todo',
    get: (todoID: string) => async() => {
        const todo = await controllerAPI.getTodoByTodoID(todoID)
        return todo
    }
})