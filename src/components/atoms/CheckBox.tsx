import { Switch } from "@headlessui/react"
import { SetStateAction, useState } from "react"
import { BiCheck } from "react-icons/bi"
type Props = {
    checked: boolean,
    setChecked: React.Dispatch<SetStateAction<boolean>>
}
const CheckBox: React.FC<Props> = ({checked, setChecked}) => {
  return (
    <div className="flex items-center">
        <Switch
        checked={checked}
        onChange={setChecked}
        className={`w-4 h-4 rounded ${checked ? 'bg-blue-600': 'bg-neutral-600'}`}
        >{checked ? <BiCheck/> : null}</Switch>
    </div>
  )
}

export default CheckBox