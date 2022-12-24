import { BiArchive, BiBarChartAlt2, BiChevronDown, BiChevronUp, BiFolder, BiHome, BiPlus, BiSearch } from "react-icons/bi"
import { useRecoilState } from "recoil"
import { SideBarAtom } from "../../../../store/SideBar"
import SideBarButton from "../atoms/SideBarButton"
import SideBarUserSection from "../molecules/SideBarUserSection"
import { useDebounce } from 'react-use'
const SideBar = () => {
    const [wideMode, setWideMode] = useRecoilState(SideBarAtom)
    const [, cancel] = useDebounce(
        () => {
        setWideMode(wideMode)
        },
        2000, [wideMode]
    );
    return (
        <div onMouseEnter={() => setWideMode(true)} onMouseLeave={() => setWideMode(false)}
        className={` ${wideMode ? 'w-64' : 'w-16'} shrink-0 h-full px-0 hidden lg:flex`}>
            <div className="w-full h-full rounded-xl flex flex-col gap-6 p-2 bg-neutral-900">
                <div className="w-full h-fit flex items-center justify-between gap-2 p-2 rounded-xl bg-neutral-800">
                    <div className="w-fit h-fit flex items-center gap-2">
                        <img src="/pool/x36/pool_primary.svg"/>
                        {wideMode ? <h3 className="font-bold text-4xl">Todos</h3> : null}
                        
                    </div>
                    {
                        wideMode ?
                        <div className="w-fit h-fit flex flex-col">
                            <BiChevronUp className="-mb-1 text-neutral-400" size={18}/>
                            <BiChevronDown className="-mt-1 text-neutral-400" size={18}/>
                        </div>
                        : null
                    }
                </div>
            <div className="w-full h-fit flex flex-col gap-4">
                <div className="w-full h-fit flex flex-col gap-2">
                    {
                        wideMode ?
                        <div className="w-full h-10 flex items-center justify-between p-2 gap-2 rounded-xl border-2 border-neutral-700 bg-neutral-800">
                            <BiSearch className="text-neutral-400" size={20} />
                            <input placeholder="Поиск..." type="text" className="w-full h-full font-semibold text-neutral-300 bg-transparent" />
                        </div>
                        :
                        <div className="w-full h-10 flex items-center justify-center p-2 gap-2 rounded-xl border-2 border-neutral-700 bg-neutral-800">
                            <BiSearch className="text-neutral-400" size={18} />
                        </div>
                    }

                    <div className="w-full flex flex-col gap-2">
                        <SideBarButton key='btn-1' title='Домой' link="/" icon={<BiHome className="text-neutral-400" size={18} />} />
                        <SideBarButton key='btn-2' title='Статистика' link="2" icon={<BiBarChartAlt2 className="text-neutral-400" size={18} />} />
                        <SideBarButton key='btn-3' title='Комнаты' link="4" icon={<BiArchive className="text-neutral-400" size={18} />} />
                    </div>
                </div>
                <hr className="border-neutral-600" />
                <div className="w-full h-fit flex flex-col">
                    {
                        wideMode ? 
                        <div className="w-full h-fit flex items-center justify-between">
                            <h4 className="text-neutral-300">Комнаты</h4>
                            <button><BiPlus className="text-neutral-400" size={18}/></button>
                        </div>
                        : null
                    }
                    <div className="w-full h-fit flex flex-col gap-2">
                        <SideBarButton key='btn-6' link="2" title='Идейная' count={3} icon={<BiFolder className="text-neutral-400" size={18} />} />
                        <SideBarButton key='btn-7' link="2" title='Для разработки' count={4} icon={<BiFolder className="text-neutral-400" size={18} />} />
                        <SideBarButton key='btn-5' link="2" title='Для учёбы' count={4} icon={<BiFolder className="text-neutral-400" size={18} />} />
                    </div>
                </div>
                {
                    wideMode ? 
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
                    : null
                }

            </div>
            <SideBarUserSection />
            </div>
        </div>
    )
}

export default SideBar