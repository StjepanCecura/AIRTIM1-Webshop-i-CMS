interface Props {
  type: string
  placeholder: string
}

const Input = ({ type, placeholder }: Props) => {
  return (
    <div className="w-full">
      <input
        placeholder={placeholder}
        type={type}
        className="bg-tetriary w-full p-3 rounded-lg border-2 border-tetriary focus:border-primary focus:shadow-sm focus:shadow-gray-500"
      />
    </div>
  )
}

export default Input
