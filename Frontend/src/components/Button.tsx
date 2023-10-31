interface Props {
  text: string
  onClick: () => void
}

const Button = ({ text, onClick }: Props) => {
  return (
    <div className="w-full">
      <button
        onClick={onClick}
        className="w-full bg-primary p-3 rounded-lg text-white font-semibold shadow-sm shadow-gray-500 text-[16px] hover:bg-secondary transition-colors"
      >
        {text}
      </button>
    </div>
  )
}

export default Button
