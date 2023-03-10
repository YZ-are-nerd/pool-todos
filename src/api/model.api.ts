import { supabase } from './client';
import { IDeskTodos, IRoom, ITodosTasks, UserData } from './types';


export const modelAPI = (() => {
    return {
        signIn: async() => {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            })
        },
        signOut: async() => {
            const { error } = await supabase.auth.signOut()
        },
        getUserByID: async(id: string) => {
            const { data, error } = await supabase
            .from('users')
            .select()
            .eq('id', id)
            .limit(1)
            .single()
            if (data) return data as UserData
            return null
        },
        getDeskTodosByID: async(id: string) => {
            const { data } = await supabase
            .from('desk_todo')
            .select()
            .eq('ref_to_room', id)
            if (data) return data as IDeskTodos[]
            return null
        },
        getDeskTodoByID: async(id: string) => {
            const { data } = await supabase
            .from('desk_todo')
            .select()
            .eq('ref_to_room', id)
            .limit(1)
            .single()
            return data as IDeskTodos
        },
        getTodosByDeskID: async(deskID: string) => {
            const { data } = await supabase
            .from('todo')
            .select()
            .eq('ref_to_desk', deskID)
            if (data) return data as ITodosTasks[]
            return null
        },
        getTodoByTodoID: async(todoID: string) => {
            const { data, error } = await supabase
            .from('todo')
            .select()
            .eq('id', todoID)
            .limit(1)
            .single()
            return data as ITodosTasks
        },
        updateListName: async(deskID: string, title: string) => {
            const { error } = await supabase
            .from('desk_todo')
            .update({
                title: title
            })
            .eq('id', deskID)
        },
        updateRoomName: async(roomID: string, title: string) => {
            const { error } = await supabase
            .from('rooms')
            .update({
                title: title
            })
            .eq('id', roomID)
        },
        updateTodoState: async(todoID: string, state: boolean) => {
            const { error } = await supabase
            .from('todo')
            .update({ state: state })
            .eq('id', todoID)
        },
        updateTodoTitle: async(todoID: string, title: string) => {
            const { error } = await supabase
            .from('todo')
            .update({ title: title })
            .eq('id', todoID)
        },
        getRoomsByUserID: async(userID: string) => {
            const { data } = await supabase
            .from('rooms')
            .select()
            .eq('room_owner', userID)
            if (data) return data as IRoom[]
            return null
        },
        getLimitedRoomsByUserID: async(userID: string, limit: number) => {
            const { data } = await supabase
            .from('rooms')
            .select()
            .eq('room_owner', userID)
            .limit(limit)
            if (data) return data as IRoom[]
            return null
        },
        getRoomByID: async(ID: string) => {
            const { data } = await supabase
            .from('rooms')
            .select()
            .eq('id', ID)
            .limit(1)
            .single()
            return data as IRoom
        },
        addListInRoom: async(roomID: string, roomName: string) => {
            const { error } = await supabase
            .from('desk_todo')
            .insert({
                ref_to_room: roomID,
                title: roomName
            })
        },
        addNewRoom: async(roomName: string, userID: string) => {
            const { error } = await supabase
            .from('rooms')
            .insert({ 
                title: roomName,
                room_owner: userID
             })
        },
        addNewTodo: async(deskID: string, state: boolean, title: string) => {
            const { error } = await supabase
            .from('todo')
            .insert({
                ref_to_desk: deskID,
                state: state,
                title: title
            })
        },
        deleteTodo: async(todoID: string) => {
            const { error } = await supabase
            .from('todo')
            .delete()
            .eq('id', todoID)
        },
        deleteRoom: async(roomID: string) => {
            const desks = await modelAPI.getDeskTodosByID(roomID)
            if (desks) {
                desks.forEach(async(desk) => {
                    await modelAPI.deleteDeskTodo(desk.id)
                })
                const { error } = await supabase
                .from('rooms')
                .delete()
                .eq('id', roomID)
            }
            const { error } = await supabase
            .from('rooms')
            .delete()
            .eq('id', roomID)
        },
        deleteDeskTodo: async(deskID: string) => {
            const todos = await modelAPI.getTodosByDeskID(deskID)
            if (todos) {
                todos.forEach(async(todo) => {
                    await modelAPI.deleteTodo(todo.id)
                })
                const { error } = await supabase
                .from('desk_todo')
                .delete()
                .eq('id', deskID)
            }
            const { error } = await supabase
            .from('desk_todo')
            .delete()
            .eq('id', deskID)
        },
        checkUserExistsByID: async(uid: string) => {
            const { data, error } = await supabase
            .from('users')
            .select("*")
            .eq('id', uid)
            .limit(1)
            .single()
            if (!error) {
                return data as UserData
            }
            return null
        },
        checkProfile: async() => {
            const sessionToCheck = await supabase.auth.getSession().then(({ data: { session } }) => {
                return session
            })
            if (sessionToCheck) {
                const checkedUser = await modelAPI.checkUserExistsByID(sessionToCheck.user.id!) 
                if (!checkedUser) {
                    const { data, error } = await supabase
                    .from('users')
                    .insert({
                        id: sessionToCheck.user.id,
                        avatar: sessionToCheck.user.user_metadata?.avatar_url,
                        username: sessionToCheck.user.user_metadata?.full_name,
                        about: `????????????, ?? ${sessionToCheck.user.user_metadata?.full_name}`,
                    })
                    .select()
                    .limit(1)
                    .single()
                    return data as UserData
                } else {
                    if (checkedUser) return checkedUser
                }
            }
            return null
        }
    }
})()