import { modelAPI } from './model.api';


export const controllerAPI = (() => {
    return {
        signIn: async() => {
            await modelAPI.signIn()
        },
        signOut: async() => {
            await modelAPI.signOut()
        },
        getUserByID: async(id: string) => {
            const user = await modelAPI.getUserByID(id)
            return user
        },
        getDeskTodosByID: async(id: string) => {
            const res = await modelAPI.getDeskTodosByID(id)
            return res
        },
        getTodosByDeskID: async(deskID: string) => {
            const res = await modelAPI.getTodosByDeskID(deskID)
            return res
        },
        getTodoByTodoID: async(todoID: string) => {
            const res = await modelAPI.getTodoByTodoID(todoID)
            return res
        },
        updateTodoState: async(todoID: string, state: boolean) => {
            const res = await modelAPI.updateTodoState(todoID, state)
            return res
        },
        getRoomByUserID: async(userID: string) => {
            const res = await modelAPI.getRoomByUserID(userID)
            return res
        },
        checkProfile: async() => {
            const res = await modelAPI.checkProfile()
            return res
        },
        addListInRoom: async(roomID: string, roomName: string) => {
            await modelAPI.addListInRoom(roomID, roomName)
        },
        addNewRoom: async(roomName: string, userID: string) => {
            await modelAPI.addNewRoom(roomName, userID)
        },
        addNewTodo: async(deskID: string, state: boolean, title: string) => {
            await modelAPI.addNewTodo(deskID, state, title)
        }
    }
})()