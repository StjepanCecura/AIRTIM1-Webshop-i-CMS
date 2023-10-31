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
        className="bg-secondary w-full p-3 rounded-lg border-2 border-secondary focus:border-primary focus:shadow-sm focus:shadow-primary"
      />
    </div>
  )
}

export default Input
