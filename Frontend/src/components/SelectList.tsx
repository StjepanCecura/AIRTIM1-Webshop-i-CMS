import { useState } from "react"
import Select from "react-select"
import { ISelect } from "../interfaces/select.interface"

const SelectList = ({
  options,
  placeholder,
}: {
  options: Array<ISelect>
  placeholder: string
}) => {
  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder={placeholder}
        isSearchable
      />
    </div>
  )
}

export default SelectList
