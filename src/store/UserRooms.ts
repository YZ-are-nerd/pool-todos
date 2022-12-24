import { IRoom } from './../api/types';
import { atomFamily, selectorFamily } from "recoil";
import { controllerAPI } from "../api/controller.api";
import { User } from "./User";

export const UserRooms = atomFamily<IRoom[] | null, string>({
    key: 'userRooms',
    default: selectorFamily({
        key: "userRoomsSelector",
        get: (id: string) => async({get}) => {
            const user = get(User)
            if (user) {
                const deskTodos = await controllerAPI.getRoomsByUserID(id)
                console.log(deskTodos);
                return deskTodos
            }    
            return null
        },
    })
})
export const LimitedUserRooms = atomFamily<IRoom[] | null, string>({
    key: 'userRoomsLimited',
    default: selectorFamily({
        key: "userRoomsSelectorLimited",
        get: (id: string) => async({get}) => {
            const user = get(User)
            if (user) {
                const deskTodos = await controllerAPI.getLimitedRoomsByUserID(id, 6)
                console.log(deskTodos);
                return deskTodos
            }    
            return null
        },
    })
})
