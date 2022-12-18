import { selector } from "recoil";
import { controllerAPI } from "../api/controller.api";
import { User } from "./User";

export const UserRooms = selector({
    key: "userRooms",
    get: async({get}) => {
        const user = get(User)
        if (user) {
            const rooms = await controllerAPI.getRoomsByUserID(user.id)
            console.log(rooms);
            return rooms
        }
        return null
    }
})