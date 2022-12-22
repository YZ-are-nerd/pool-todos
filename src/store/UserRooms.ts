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

// export const UserRooms = selector({
//     key: "userRooms",
//     get: async({get}) => {
//         const user = get(User)
//         if (user) {
//             const rooms = await controllerAPI.getRoomsByUserID(user.id)
//             console.log(rooms);
//             return rooms
//         }
//         return null
//     }
// })