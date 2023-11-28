import { useState } from "react"
import Select from "react-select"
import { ISelect } from "../interfaces/select.interface"

const colourStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isFocused ? "#5B6DF1" : null,
      color: isFocused ? "#ffffff" : "#000000",
    }
  },
}

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
        styles={colourStyles}
      />
    </div>
  )
}

export default SelectList
