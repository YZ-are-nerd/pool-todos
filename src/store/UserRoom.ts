import { selectorFamily } from "recoil";
import { controllerAPI } from "../api/controller.api";

export const UserRoom = selectorFamily({
    key: 'UserRoom',
    get: (roomID: string) => async() => {
        const room = await controllerAPI.getRoomByID(roomID)
        return room
    }
})