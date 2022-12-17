import { supabase } from './client';
import { IDeskTodos } from '../store/DeskTodos';
import { UserData } from '../store/User';
import { ITodosTasks } from '../store/TodosTasks';


export const modelAPI = (() => {
    return {
        signIn: async() => {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            })
            console.log(error);
        },
        signOut: async() => {
            const { error } = await supabase.auth.signOut()
            console.log(error);
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
        updateTodoState: async(todoID: string, state: boolean) => {
            const { error } = await supabase
            .from('todo')
            .update({ state: state })
            .eq('id', todoID)
            console.log(error);
            
        },
        getRoomByUserID: async(userID: string) => {
            const { data } = await supabase
            .from('rooms')
            .select()
            .eq('room_owner', userID)
            if (data) return data as IDeskTodos[]
            return null
        },
        addListInRoom: async(roomID: string, roomName: string) => {
            const { error } = await supabase
            .from('desk_todo')
            .insert({
                ref_to_room: roomID,
                name: roomName
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
            console.log(error);
        },
        checkUserExistsByID: async(uid: string) => {
            console.log(uid);
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
                        about: `Привет, я ${sessionToCheck.user.user_metadata?.full_name}`,
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