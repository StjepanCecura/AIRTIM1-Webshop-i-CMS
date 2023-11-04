import { useState } from "react"
import EyeSVG from "../assets/eye.svg"
import EyeCrossedSVG from "../assets/eye-crossed.svg"
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

  const [passwordState, setPasswordState] = useState(type)

  const handlePasswordClick = () => {
    if (passwordState === "password") setPasswordState("text")
    if (passwordState === "text") setPasswordState("password")
  }

  const isPassword = type === "password"

  return (
    <div className="w-full">
      <div className="relative">
        <input
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={isPassword ? passwordState : type}
          className={`bg-tetriary w-full p-3 pr-10 rounded-lg border-2 focus:border-primary focus:shadow-sm focus:shadow-gray-500 ${borderColorClass}`}
        />
        {isPassword ? (
          <div
            className="absolute right-3 top-[18px] hover:cursor-pointer"
            onClick={handlePasswordClick}
          >
            {passwordState === "password" ? (
              <img src={EyeSVG} alt="" className="h-4" />
            ) : (
              <img src={EyeCrossedSVG} alt="" className="h-4" />
            )}
          </div>
        ) : null}
      </div>

      {errorMessage ? (
        <p className="text-sm text-red-500">{errorMessage}</p>
      ) : null}
    </div>
  )
}

export default Input
