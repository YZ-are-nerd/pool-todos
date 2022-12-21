import { selector, atom } from 'recoil';
import { DateTime } from 'luxon';
import { getRecoil, setRecoil } from 'recoil-nexus';
const location = {
    country: {
        id: 'ru-RU'
    },
    timezoneId: 'Asia/Yekaterinburg'
}
export const MouthAtom = atom<number>({
    key: 'MouthAtom',
    default: DateTime.now().toObject().month,
    effects: [
        ({onSet}) => {
            onSet(newMonth => {
                const currYear = getRecoil(YearAtom)
                if (newMonth === 13) {
                    setRecoil(MouthAtom, 1)
                    setRecoil(YearAtom,  currYear + 1);
                }
                if (newMonth === 0) {
                    setRecoil(MouthAtom, 12)
                    setRecoil(YearAtom,  currYear - 1);
                }
            })
        }
    ]
})
export const YearAtom = atom<number>({
    key: 'YearAtom',
    default: DateTime.now().toObject().year,
})
export const DayAtom = atom<number>({
    key: 'DayAtom',
    default: DateTime.now().toObject().day,
})
export const CalendarDate = selector({
    key: 'CalendarDate',
    get: ({get}) => {
        const year = get(YearAtom)
        const month = get(MouthAtom)
        const day = get(DayAtom)
        const date = DateTime.fromObject({year: year, month: month, day: day}).setLocale(location.country.id).setZone(location.timezoneId)
        const start = DateTime.fromObject({year: year, month: month, day: 1}).setLocale(location.country.id).setZone(location.timezoneId).toObject()
        const end = DateTime.fromObject({year: year, month: month, day: date.daysInMonth}).setLocale(location.country.id).setZone(location.timezoneId).toObject()
        const days: DateTime[] = []
        for (let i = start.day; i <= end.day; i++) {
            const dayContent = DateTime.fromObject({year: year, month: month, day: i}).setLocale('ru-RU')
            days.push(dayContent)
        }
        const weekNumberOfFirstDay = DateTime.fromObject(start).weekday 
        const prefMonth = DateTime.fromObject(start).minus({month: 1})
        const daysOfPrevMonth = prefMonth.daysInMonth
        if (weekNumberOfFirstDay <= 7) {
            for (let i = daysOfPrevMonth; i !== daysOfPrevMonth - (weekNumberOfFirstDay - 1); i--) {
                const dayContent = DateTime.fromObject({year: prefMonth.year, month: prefMonth.month, day: i}).setLocale('ru-RU')
                days.unshift(dayContent)
            }
        }
        const weekNumberOfLastDay = DateTime.fromObject(end).weekday
        const nextMonth = DateTime.fromObject(end).plus({month: 1})
        if (weekNumberOfLastDay <= 7) {
            for (let i = 1; i !== 8 - weekNumberOfLastDay; i++) {
                const dayContent = DateTime.fromObject({year: nextMonth.year, month: nextMonth.month, day: i}).setLocale('ru-RU')
                days.push(dayContent)
            }
        }
        if (days.length > 35) {
            days.length = 35
        }
        return { date, days }
    }
})
