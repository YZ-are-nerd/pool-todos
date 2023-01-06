import { useRecoilValue } from "recoil"
import { Statistics } from "../../../store/Statistics"
import NotCheckedTodoList from "../../lists/NotCheckedTodoList";
const Statisctics = () => {
    const stat = useRecoilValue(Statistics)
    return (
        <div className='lg:w-1/3 w-full h-full rounded-xl flex flex-col gap-2 p-2 overflow-hidden border-2 border-neutral-900'>
            <h2 className='text-xl lg:text-3xl font-bold text-neutral-300'>Ждут когда их выполнят</h2>
            <div className="w-full max-h-full rounded-xl flex flex-col pr-1 overflow-y-auto">
                <div className="w-full h-fit shrink-0 flex flex-col gap-1">
                    {
                        stat &&
                        stat.map((statData) => {
                            if(statData.todos.length === 0) return <></>
                            return (
                                <div key={statData.deskID} className="w-full h-fit flex flex-col rounded-xl gap-2 border-2 p-2 border-neutral-900">
                                    <p className="text-lg lg:text-xl font-bold line-clamp-1 text-neutral-300">{statData.name}</p>
                                    <div className="w-full h-fit flex flex-col gap-1">
                                        <NotCheckedTodoList deskData={statData} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Statisctics