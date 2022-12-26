import { BiSearch, BiHome, BiArchive } from 'react-icons/bi'
import { useRecoilValue } from 'recoil'
import { SideBarAtom } from '../../../../store/SideBar'
import SideBarButton from '../atoms/SideBarButton'
const PagesSection = () => {
    const wideMode = useRecoilValue(SideBarAtom)
  return (
    <div className="w-full h-fit flex flex-col gap-2">
        {/* {
            wideMode ?
            <div className="w-full h-10 flex items-center justify-between p-2 gap-2 rounded-xl border-2 border-neutral-700 bg-neutral-800">
                <BiSearch className="text-neutral-400" size={20} />
                <input placeholder="Поиск..." type="text" className="w-full h-full font-semibold text-neutral-300 bg-transparent" />
            </div>
            :
            <div className="w-full h-10 flex items-center justify-center p-2 gap-2 rounded-xl border-2 border-neutral-700 bg-neutral-800">
                <BiSearch className="text-neutral-400" size={18} />
            </div>
        } */}
        <div className="w-full flex flex-col gap-2">
            <SideBarButton key='btn-1' title='Домой' link="/" icon={<BiHome className="text-neutral-400" size={18} />} />
            {/* <SideBarButton key='btn-2' title='Статистика' link="/statictic" icon={<BiBarChartAlt2 className="text-neutral-400" size={18} />} /> */}
            <SideBarButton key='btn-3' title='Комнаты' link="/rooms" icon={<BiArchive className="text-neutral-400" size={18} />} />
        </div>
    </div>
  )
}

export default PagesSection