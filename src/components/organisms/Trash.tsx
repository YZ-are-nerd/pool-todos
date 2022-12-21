import { BiLinkExternal } from "react-icons/bi"
import InDevPlaceHolder from "../atoms/InDevPlaceHolder"

const Trash = () => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 h-96 lg:h-full 
    flex flex-col rounded-xl p-2 gap-2 border-2 snap-always snap-center
     border-neutral-800 bg-neutral-900">
        <div className="w-full h-fit flex items-center justify-between">
            <div className="w-fit h-full flex items-center gap-2">
                <h1 className="text-2xl lg:text-4xl font-bold">Корзина</h1>
            </div>
            <button className="text-white"><BiLinkExternal size={24} /></button>
        </div>
        <InDevPlaceHolder />
    </div>
  )
}

export default Trash