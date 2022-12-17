import { selectorFamily } from 'recoil';
import { controllerAPI } from '../api/controller.api';



export const RoomData = selectorFamily({
    key: 'RoomData',
    get: (roomID: string) => async() => {
        const lists = await controllerAPI.getDeskTodosByID(roomID)
        return lists
    }
})