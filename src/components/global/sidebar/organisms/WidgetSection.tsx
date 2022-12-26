import { useRecoilValue } from "recoil"
import { SideBarAtom } from "../../../../store/SideBar"

const WidgetSection = () => {
    const wideMode = useRecoilValue(SideBarAtom)
    if (wideMode) {
        return (
            <div className="w-full h-fit flex flex-col">
                <div className="w-full h-fit flex items-center justify-between">
                    <h4 className="text-neutral-300">Виджеты</h4>
                    <button></button>
                </div>
                <div className="w-full h-fit flex flex-col p-1 gap-2">
                    <div className="w-full h-32 py-1 px-2 rounded-xl flex items-center justify-between gap-2 cursor-pointer bg-neutral-800 hover:bg-opacity-80"></div>
                    <div className="w-full h-32 py-1 px-2 rounded-xl flex items-center justify-between gap-2 cursor-pointer bg-neutral-800 hover:bg-opacity-80"></div>
                </div>
            </div>
        )
    } else return (
        <></>
    )
}

export default WidgetSection