import { selectorFamily } from "recoil";
import { controllerAPI } from "../api/statAPI/controller.api";

export const RoomStat = selectorFamily({
    key: "roomStat",
    get: (roomID: string) => async() => {
        const stats = await controllerAPI.getRoomStatistics(roomID);
        return stats;
    }
})
export const ListStat = selectorFamily({
    key: "listStat",
    get: (listID: string) => async() => {
        const stats = await controllerAPI.getListStatistics(listID);
        return stats; 
    }
})