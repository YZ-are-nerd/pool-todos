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
        className={`w-4 h-4 rounded border-2 transition-all ${checked ? 'bg-blue-600 border-blue-500': 'bg-neutral-800 border-neutral-600 hover:bg-neutral-700'}`}
        >
          <div className="w-full h-full flex items-center justify-center">
            {checked ? <BiCheck/> : null}
          </div>
        </Switch>
    </div>
  )
}

export default CheckBox