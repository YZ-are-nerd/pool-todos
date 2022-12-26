import React from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { SideBarAtom } from '../../../../store/SideBar'
type Props = {
    title: string,
    icon: JSX.Element,
    link: string,
    count?: number
}
const SideBarButton: React.FC<Props> = ({title, icon, count, link}) => {
    const [wideMode, setWideMode] = useRecoilState(SideBarAtom)
    if (wideMode) {
        return (
            <Link to={link} onClick={() => setWideMode(false)} className="w-full h-fit py-1 px-2 rounded-xl flex items-center justify-between gap-2 cursor-pointer bg-neutral-800 hover:bg-opacity-80">
                <div className="w-fit h-full flex items-center gap-2">
                    <>{icon}</>
                    <p className="text-sm mt-0.5 text-neutral-400">{title}</p>
                </div>
                <div className="w-fit h-full flex items-center gap-0">
                    {
                        count &&
                        <span className="w-5 h-5 flex items-center justify-center text-xs rounded-full text-neutral-300 bg-neutral-700">{count}</span>
                    }
                    <BiChevronRight className="text-neutral-400" size={18} />
                </div>
            </Link>
        )
    } else 
    return (
        <Link to={link} className="w-full h-fit px-2 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer bg-neutral-800 hover:bg-opacity-80">
            {icon}
        </Link>
    )
}

export default SideBarButton