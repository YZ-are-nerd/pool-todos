import { atom, selector } from 'recoil';
import { controllerAPI } from '../api/controller.api';
import { supabase } from '../api/client';

export interface UserData {
    id: string,
    username: string,
    created_at: string,
    avatar: string,
    about: string,
}
const getUserProfile = async() => {
    const user = controllerAPI.checkProfile()
    if (user) return user
    return null
}
export const User = atom<UserData | null>({
    key: "user",
    default: null,
    effects: [
        ({onSet}) => {
            onSet((val) => {
                console.log(val)
            })
        },
        ({setSelf}) => {
            getUserProfile()
            .then((res) => {if (res) setSelf(res)})     
        }
    ]
})
