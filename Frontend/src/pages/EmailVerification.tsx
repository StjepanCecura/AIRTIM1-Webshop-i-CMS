import { useEffect, useState } from "react"
import EmailVerifiedSVG from "../assets/email-verified.svg"
import Button from "../components/Button"
import { useNavigate, useParams } from "react-router-dom"
import Spinner from "../components/Spinner"

const EmailVerification = () => {
  const navigate = useNavigate()
  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)

  const handleHomeClick = () => {
    navigate("/")
  }

  const verifyUserEmail = async (id: string) => {
    setIsLoading(true)
    console.log("ID -> ", id)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsLoading(false)
  }

  useEffect(() => {
    if ((params?.id ?? "") !== "") {
      verifyUserEmail(params?.id as string)
    }
    return () => {}
  }, [params])

  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center flex-col gap-7">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-1 justify-center items-center flex-col gap-7">
      <img src={EmailVerifiedSVG} alt="" className="h-[10rem] ml-4" />
      <p className="text-[36px] text-center">Email verified successfully!</p>
      <div className="w-[300px] mt-4">
        <Button text="Home page" onClick={handleHomeClick} />
      </div>
    </div>
  )
}

export default EmailVerification
