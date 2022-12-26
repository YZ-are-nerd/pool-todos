import { Suspense } from 'react'
import { useRecoilValue } from 'recoil'
import { SideBarAtom } from '../../../../store/SideBar'
import SideBarRoomsList from '../lists/SideBarRoomsList'

const RoomsSection = () => {
    const wideMode = useRecoilValue(SideBarAtom)
    return (
        <div className="w-full h-fit flex gap-2 flex-col">
            {
                wideMode ? 
                <div className="w-full h-fit flex items-center justify-between">
                    <h4 className="text-neutral-300">Комнаты</h4>
                    {/* <button><BiPlus className="text-neutral-400" size={18}/></button> */}
                </div>
                : null
            }
            <div className="w-full h-fit flex flex-col gap-2">
                <Suspense fallback={<></>}>
                    <SideBarRoomsList/>
                </Suspense>
            </div>
        </div>
    )
}

export default RoomsSection