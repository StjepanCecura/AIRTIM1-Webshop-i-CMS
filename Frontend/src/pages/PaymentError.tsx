import EmailVerifiedSVG from "../assets/email-verified.svg"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

const PaymentError = () => {
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate("/")
  }

  return (
    <div className="flex flex-1 justify-center items-center flex-col gap-7">
      <img src={EmailVerifiedSVG} alt="" className="h-[10rem] ml-4" />
      <p className="text-[36px] text-center">Payment Error</p>
      <p className="text-[20px] text-center">Error while processing payment!</p>

      <div className="w-[300px] mt-4">
        <Button text="Home page" onClick={handleHomeClick} />
      </div>
    </div>
  )
}

export default PaymentError
