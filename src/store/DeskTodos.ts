import { selectorFamily } from "recoil";
import { User } from './User';
import { controllerAPI } from '../api/controller.api';

export interface IDeskTodos {
    id: string,
    ref_to_room: string,
    created_at: string,
    title: string
}

export const DeskTodos = selectorFamily({
    key: "DeskTodos",
    get: (id: string) => ({get}) => {
        const user = get(User)
        if (user) {
            const deskTodos = controllerAPI.getDeskTodosByID(id)
            return deskTodos
        }    
        return null
    },
})