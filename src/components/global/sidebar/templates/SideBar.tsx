import { useRecoilState } from "recoil"
import { SideBarAtom } from "../../../../store/SideBar"
import SideBarUserSection from "../molecules/SideBarUserSection"
import { useDebounce } from 'react-use'
import RoomsSection from "../organisms/RoomsSection"
import PagesSection from "../organisms/PagesSection"
import ProjectSection from "../organisms/ProjectSection"
import { useLocation } from "react-router-dom"
const SideBar = () => {
    const [wideMode, setWideMode] = useRecoilState(SideBarAtom)
    const location = useLocation()
    const [, cancel] = useDebounce(
        () => {
            setWideMode(wideMode)
        },
        2000, [wideMode]
    );
    if (location.pathname === '/auth') {
        return <></>
    } else return (
        <div onMouseEnter={() => setWideMode(true)} onMouseLeave={() => setWideMode(false)}
        className={` ${wideMode ? 'w-64' : 'w-16'} shrink-0 h-full px-0 hidden lg:flex`}>
            <div className="w-full h-full rounded-xl flex flex-col gap-6 p-2 bg-neutral-900">
                <ProjectSection />
            <div className="w-full h-fit flex flex-col gap-4">
                <PagesSection />
                <hr className="border-neutral-600" />
                <RoomsSection />
                {/* <WidgetSection /> */}
            </div>
            <SideBarUserSection />
            </div>
        </div>
    )
}

export default SideBar