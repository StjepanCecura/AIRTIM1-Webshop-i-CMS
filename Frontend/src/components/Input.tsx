interface Props {
  type: string
  placeholder: string
  onChange: (e: any) => void
  value: string
  error?: boolean
}

const Input = ({ type, placeholder, onChange, value, error }: Props) => {
  const borderColorClass = error ? "border-red-500" : "border-tetriary"

  return (
    <div className="w-full">
      <input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className={`bg-tetriary w-full p-3 rounded-lg border-2 focus:border-primary focus:shadow-sm focus:shadow-gray-500 ${borderColorClass}`}
      />
    </div>
  )
}

export default Input
