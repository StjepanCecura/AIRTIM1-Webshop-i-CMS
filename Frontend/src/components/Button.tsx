import Spinner from "./Spinner"
interface Props {
  text: string
  onClick: () => void
  loading?: boolean
  disabled?: boolean
}

const Button = ({
  text,
  onClick,
  disabled = false,
  loading = false,
}: Props) => {
  const buttonColor = disabled ? "bg-slate-500" : "bg-primary"
  const buttonHoverColor = disabled
    ? "hover:bg-slate-500"
    : "hover:bg-secondary"
  return (
    <div className="w-full">
      <button
        onClick={disabled ? () => {} : onClick}
        className={`w-full ${buttonColor} h-[50px] rounded-lg text-white font-semibold shadow-sm shadow-gray-500 text-[16px] ${buttonHoverColor} transition-colors`}
      >
        {loading ? <Spinner /> : text}
      </button>
    </div>
  )
}

export default Button
