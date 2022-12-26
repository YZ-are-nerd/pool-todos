import { IListStats, ITodosStats, ITodosTasks } from './../types';
import { supabase } from "../client"
import { IDeskTodos } from "../types"

export const modelAPI = (() => {
    return {
        getListsCount: async(roomId: string) => {
            const { count } = await supabase
            .from('desk_todo')
            .select('*', { count: 'exact', head: true })
            .eq('ref_to_room', roomId)
            return count
        },
        getLists: async(roomId: string) => {
            const { data } = await supabase
            .from('desk_todo')
            .select('*')
            .eq('ref_to_room', roomId)
            return data as IDeskTodos[]
        },
        getTodosCount: async(listID: string) => {
            const { count } = await supabase
            .from('todo')
            .select('*', { count: 'exact', head: true })
            .eq('ref_to_desk', listID)
            return count
        },
        getTodos: async(listID: string) => {
            const { data } = await supabase
            .from('todo')
            .select('*')
            .eq('ref_to_desk', listID)
            return data as ITodosTasks[]
        },
        getRoomStatistics: async(roomId: string) => {
            const count = await modelAPI.getListsCount(roomId)
            const lists = await modelAPI.getLists(roomId)
            const stats: IListStats = {
                count: count,
                data: lists
            }
            return stats
        },
        getListStatistics: async(listID: string) => {
            const count = await modelAPI.getTodosCount(listID)
            const todos = await modelAPI.getTodos(listID)
            const stats: ITodosStats = {
                count: count,
                data: todos
            }
            return stats
        }
    }
})()