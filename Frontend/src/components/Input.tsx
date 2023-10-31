interface Props {
  type: string
  placeholder: string
  onChange: (e: any) => void
  value: string
}

const Input = ({ type, placeholder, onChange, value }: Props) => {
  return (
    <div className="w-full">
      <input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="bg-tetriary w-full p-3 rounded-lg border-2 border-tetriary focus:border-primary focus:shadow-sm focus:shadow-gray-500"
      />
    </div>
  )
}

export default Input
