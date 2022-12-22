import { DateTime } from 'luxon'
import { BiLinkExternal, BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { useRecoilValue, useRecoilState } from 'recoil'
import { CalendarDate, MouthAtom } from '../../../store/Calendar'
import InDevPlaceHolder from '../../global/InDevPlaceHolder'

const Calendar = () => {
    const dateToCalendar = useRecoilValue(CalendarDate)
    const [month, setMonth] = useRecoilState(MouthAtom)
    return (
        <div className="lg:w-1/3 w-full h-full 
        flex flex-col rounded-xl p-2 gap-2 border-2 snap-always snap-center
         border-neutral-800 bg-neutral-900">
            <div className="w-full h-fit flex items-center justify-between">
                <div className="w-fit h-full flex items-center gap-2">
                    <h1 className="text-2xl lg:text-4xl font-bold">Cегодня</h1>
                    <p className='mt-2 text-sm text-neutral-400'>
                        {DateTime.now().setLocale('ru-RU').toFormat('dd MMMM')}
                    </p>
                </div>
                <button className="text-white"><BiLinkExternal size={24} /></button>
            </div>
            <div className="w-full h-fit flex flex-col">
                <div className="w-full h-fit flex items-center justify-between">
                    {/* <button onClick={() => setMonth(month - 1)} className='btn-sm btn-blue-ghost'><BiChevronLeft size={20}/></button> */}
                    {/* <h3 className='normal-case'>{dateToCalendar.date.toFormat('LLLL yyyy')[0].toUpperCase()}
                        {dateToCalendar.date.toFormat('LLLL yyyy').substring(1, dateToCalendar.date.toFormat('LLLL yyyy').length)}
                    </h3> */}
                    {/* <button onClick={() => setMonth(month + 1)} className='btn-sm btn-blue-ghost'><BiChevronRight size={20}/></button> */}
                </div>
            </div>
            <div className="w-full h-full flex flex-col">
                <InDevPlaceHolder />
            </div>
        </div>
    )
}

export default Calendar