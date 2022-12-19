import { modelAPI } from "./model.api"

export const controllerAPI = (() => {
    return {
        getRoomStatistics: async(roomId: string) => {
            const res = await modelAPI.getRoomStatistics(roomId)
            return res
        },
        getListStatistics: async(listID: string) => {
            const res = await modelAPI.getListStatistics(listID)
            return res
        }
    }
})()