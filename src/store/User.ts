import { atom } from 'recoil';
import { controllerAPI } from '../api/controller.api';
import { UserData } from '../api/types';


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
