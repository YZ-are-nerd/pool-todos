import { DateTime } from 'luxon';
import { ReactNode } from 'react';
import { selectorFamily } from 'recoil';
import { controllerAPI } from '../api/controller.api';
import Auth from '../components/templates/Auth';
import NewTab from '../components/templates/NewTab';
import { IconType } from 'react-icons/lib';
import { BiPlus } from 'react-icons/bi';
import Room from '../components/templates/Room';

export interface ITabs {
    id: string,
    title: string | IconType | JSX.IntrinsicElements["p"],
    created_at: string,
    content?: ReactNode | ReactNode[]
}
const loginPreset: ITabs = {
        id: 'login',
        title: 'Авторизация',
        created_at: DateTime.now().toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY),
        content: <Auth /> 
}
const newTab: ITabs = {
    id: 'newTab',
    title: <p className='flex items-center gap-1'><BiPlus size={24}/></p>,
    created_at: DateTime.now().toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY),
    content: <NewTab />
}
export const Tabs = selectorFamily({
    key: 'Tabs',
    get: (userID: string | null) => async({get}) => {
        const tabs: ITabs[] = []
        if (!userID) {
            tabs.push(loginPreset)
            return tabs
        } 
        const rooms = await controllerAPI.getRoomByUserID(userID)
        console.log(rooms);
        if (rooms?.length !== 0) {
            rooms?.forEach((room) => {
                const roomTab: ITabs = {
                    id: room.id,
                    created_at: room.created_at,
                    title: room.title,
                    content: <Room roomName={room.title} roomID={room.id} key={room.id} />
                }
                tabs.push(roomTab)
            })
            tabs.push(newTab)
        } else {
            tabs.push(newTab)
            return tabs
        }
        return tabs
    }
})