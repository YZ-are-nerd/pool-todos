import { IDeskTodos } from './../api/types';
import { atomFamily, selectorFamily } from "recoil";
import { User } from './User';
import { controllerAPI } from '../api/controller.api';
export const DeskTodos = atomFamily<IDeskTodos[] | null, string>({
    key: 'todoListAtom',
    default: selectorFamily({
        key: "DeskTodos",
        get: (id: string) => async({get}) => {
            const user = get(User)
            if (user) {
                const deskTodos = await controllerAPI.getDeskTodosByID(id)
                console.log(deskTodos);
                return deskTodos
            }    
            return null
        },
    })
})