import { useRecoilValue } from 'recoil'
import { SideBarAtom } from '../../../../store/SideBar'

const ProjectSection = () => {
    const wideMode = useRecoilValue(SideBarAtom)
    return (
        <div className="w-full h-fit flex items-center justify-between gap-2 p-2 rounded-xl bg-neutral-800">
            <div className="w-fit h-fit flex items-center gap-2">
                <img src="/pool/x36/pool_primary.svg"/>
                {wideMode ? <h3 className="font-bold text-4xl">Todos</h3> : null}
                
            </div>
            {/* {
                wideMode ?
                <div className="w-fit h-fit flex flex-col">
                    <BiChevronUp className="-mb-1 text-neutral-400" size={18}/>
                    <BiChevronDown className="-mt-1 text-neutral-400" size={18}/>
                </div>
                : null
            } */}
        </div>
    )
}

export default ProjectSection