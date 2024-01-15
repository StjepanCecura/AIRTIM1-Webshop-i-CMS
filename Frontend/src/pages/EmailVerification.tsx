import { useEffect, useState } from "react"
import EmailVerifiedSVG from "../assets/email-verified.svg"
import EmailNotVerifiedSVG from "../assets/email-not-verified.svg"
import Button from "../components/Button"
import { useNavigate, useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import { API_URL } from "../constants"
import axios from "axios"

const EmailVerification = () => {
  const navigate = useNavigate()
  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleHomeClick = () => {
    navigate("/")
  }

  const verifyUserEmail = async (id: string) => {
    setIsLoading(true)
    await axios
      .put(`${API_URL}/customer/email-verification`, { id: id })
      .then((res) => {
        if (res?.status == 200) {
          // navigate("/")
        }
      })
      .catch((err) => {
        setIsError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if ((params?.id ?? "") !== "") {
      verifyUserEmail(params?.id as string)
    }
    return () => {}
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center flex-col gap-7">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-1 justify-center items-center flex-col gap-7">
      {isError ? (
        <>
          <img src={EmailNotVerifiedSVG} alt="" className="h-[10rem] ml-4" />
          <p className="text-[36px] text-center">
            Error verifying email! Please try again later.
          </p>
        </>
      ) : (
        <>
          <img src={EmailVerifiedSVG} alt="" className="h-[10rem] ml-4" />
          <p className="text-[36px] text-center">
            Email verified successfully!
          </p>
        </>
      )}
      <div className="w-[300px] mt-4">
        <Button text="Home page" onClick={handleHomeClick} />
      </div>
    </div>
  )
}

export default EmailVerification
