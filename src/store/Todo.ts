import { setRecoil } from 'recoil-nexus';
import { ITodosTasks } from './../api/types';
import { selectorFamily, atomFamily } from 'recoil';
import { controllerAPI } from '../api/controller.api';
export const Todo = atomFamily<ITodosTasks, string>({
    key: 'todoData',
    default: selectorFamily({
        key: 'todo',
        get: (todoID: string) => async() => {
            const todo = await controllerAPI.getTodoByTodoID(todoID)
            return todo
        }
    })
})