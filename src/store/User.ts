import { selector } from 'recoil';
import { controllerAPI } from '../api/controller.api';

export const User = selector({
    key: "User",
    get: async() => {
        const user = await controllerAPI.checkProfile()
        return user
    }
})