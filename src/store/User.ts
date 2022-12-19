import { redirect } from 'react-router-dom';
import { atom } from 'recoil';
import { controllerAPI } from '../api/controller.api';
import { UserData } from '../api/types';
export const User = atom<UserData | null>({
    key: "user",
    default: null,
    effects: [
        ({onSet}) => {
            onSet((val) => {
                console.log(val)
            })
        },
        ({setSelf}) => async() => {
            const user = await controllerAPI.checkProfile()
            console.log('user', user);
            if (user) {
                setSelf(user)
            }
        }
    ]
})
