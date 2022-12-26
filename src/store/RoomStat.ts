import { ITodosStats } from './../api/types';
import { selectorFamily } from "recoil";
import { controllerAPI } from "../api/statAPI/controller.api";

export const RoomStat = selectorFamily({
    key: "roomStat",
    get: (roomID: string) => async() => {
        const stats = await controllerAPI.getRoomStatistics(roomID);
        const listsStats: ITodosStats[] = []
        stats.data.forEach(async(data) => {
            const stat = await controllerAPI.getListStatistics(data.id)
            listsStats.push(stat);
        })
        return {roomStat: stats, listsStats: listsStats};
    }
})
export const ListStat = selectorFamily({
    key: "listStat",
    get: (listID: string) => async() => {
        const stats = await controllerAPI.getListStatistics(listID);
        return stats; 
    }
})