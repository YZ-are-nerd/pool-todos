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
        getDeskTodoByID: async(id: string) => {
            const res = await modelAPI.getDeskTodoByID(id)
            return res
        },
        deleteDeskTodo: async(deskID: string) => {
            await modelAPI.deleteDeskTodo(deskID)
        },
        deleteRoom: async(roomID: string) => {
            await modelAPI.deleteRoom(roomID)
        },
        getTodosByDeskID: async(deskID: string) => {
            const res = await modelAPI.getTodosByDeskID(deskID)
            return res
        },
        getTodoByTodoID: async(todoID: string) => {
            const res = await modelAPI.getTodoByTodoID(todoID)
            return res
        },
        updateListName: async(deskID: string, title: string) => {
            const res = await modelAPI.updateListName(deskID, title)
            return res
        },
        updateRoomName: async(roomID: string, title: string) => {
            const res = await modelAPI.updateRoomName(roomID, title)
            return res
        },
        updateTodoState: async(todoID: string, state: boolean) => {
            const res = await modelAPI.updateTodoState(todoID, state)
            return res
        },
        updateTodoTitle: async(todoID: string, title: string) => {
            const res = await modelAPI.updateTodoTitle(todoID, title)
            return res
        },
        getRoomsByUserID: async(userID: string) => {
            const res = await modelAPI.getRoomsByUserID(userID)
            return res
        },
        getRoomByID: async(ID: string) => {
            const res = await modelAPI.getRoomByID(ID)
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
        },
        deleteTodo: async(todoID: string) => {
            await modelAPI.deleteTodo(todoID)
        }
    }
})()