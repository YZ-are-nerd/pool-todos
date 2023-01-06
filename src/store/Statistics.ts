import { TodoListAtom } from './TodoList';
import { DeskTodos } from './RoomDesks';
import { IDeskTodos, ITodosTasks } from './../api/types';
import { UserRooms } from './UserRooms';
import { User } from './User';
import { atom, selector } from "recoil";
export type TodosByDesk = {
    name: string,
    deskID: string,
    todos: ITodosTasks[]
}
export const Statistics = atom({
    key: "statistics",
    default: selector({
        key: 'statisticsSelector',
        get: ({get}) => {
            const user = get(User)
            if (user) {
                const rooms = get(UserRooms(user.id))
                const desks: IDeskTodos[] = []
                if (rooms) {
                    rooms.forEach((room) => {
                        const desksData = get(DeskTodos(room.id))
                        if (desksData) {
                            desksData.forEach(item => desks.push(item))
                        } 
                    })
                }
                const todosByDeskCollections: TodosByDesk[] = []
                desks.forEach((desk) => {
                    const lists = get(TodoListAtom(desk.id))
                    const deskWTodos: TodosByDesk = {
                        name: desk.title,
                        deskID: desk.id,
                        todos: []
                    }
                    if (lists.unCheckedList.length > 0) {
                        lists.unCheckedList.forEach((task) => deskWTodos.todos.push(task))
                    }
                    todosByDeskCollections.push(deskWTodos)
                })
                return todosByDeskCollections
            }
            return null
        }
    })
})