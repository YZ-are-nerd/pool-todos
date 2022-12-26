import { atom } from 'recoil';

export const SideBarAtom = atom<boolean>({
    key: 'sidebarState',
    default: false
})