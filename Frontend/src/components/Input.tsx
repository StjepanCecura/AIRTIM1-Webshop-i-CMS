interface Props {
  type: string
  placeholder: string
  onChange: (e: any) => void
  value: string
  errorMessage?: string
}

const Input = ({ type, placeholder, onChange, value, errorMessage }: Props) => {
  const borderColorClass =
    (errorMessage ?? "") == "" ? "border-tetriary" : "border-red-500"

  return (
    <div className="w-full">
      <input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className={`bg-tetriary w-full p-3 rounded-lg border-2 focus:border-primary focus:shadow-sm focus:shadow-gray-500 ${borderColorClass}`}
      />
      {errorMessage ? (
        <p className="text-sm text-red-500">{errorMessage}</p>
      ) : null}
    </div>
  )
}

export default Input
