export interface UserData {
    id: string,
    username: string,
    created_at: string,
    avatar: string,
    about: string,
}
export interface ITodosTasks {
    id: string,
    createdAt: string,
    ref_to_desk: string,
    state: boolean,
    title: string
}
export interface IDeskTodos {
    id: string,
    ref_to_room: string,
    created_at: string,
    title: string
}
export interface IRoom {
    id: string,
    room_owner: string,
    created_at: string,
    title: string
}