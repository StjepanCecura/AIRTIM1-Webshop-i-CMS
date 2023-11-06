import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../constants"
import { toast } from "react-toastify"
import { setLoginStatus } from "../services/lsLoginStatus"

function Login() {
  const navigate = useNavigate()
  const [loadingStack, setLoadingStack] = useState<number[]>([])
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [passwordError, setPasswordError] = useState("")
  const [emailError, setEmailError] = useState("")

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const handleChange = (
    key: keyof typeof formData,
    value: number | string | boolean
  ) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }

  const checkPassword = () => {
    return formData.password != ""
  }

  const checkEmail = () => {
    return formData.email != ""
  }

  const handleErrorWhileSignIn = (error: string) => {
    setPasswordError(error)
    setEmailError(error)
  }

  const handleLogin = async () => {
    startLoading()
    await axios
      .post(`${API_URL}/customer/login`, { ...formData })
      .then((res) => {
        console.log(res)
        if (res?.status == 200) {
          setLoginStatus(true)
          navigate("/")
        }
      })
      .catch((err) => {
        if (err?.response.status == 401) {
          handleErrorWhileSignIn(err?.response?.data?.message)
        } else {
          toast.error("Error while signing in. Please try again later.")
        }
      })
      .finally(() => {
        stopLoading()
      })
  }

  const verifyFormData = () => {
    const passwordGood = checkPassword()
    const emailGood = checkEmail()
    let error = false
    if (!passwordGood) {
      setPasswordError("Password cannot be empty.")
      error = true
    } else {
      setPasswordError("")
    }
    if (!emailGood) {
      setEmailError("Email cannot be empty.")
      error = true
    } else {
      setEmailError("")
    }
    return error
  }

  const handleLoginClick = () => {
    const isError = verifyFormData()
    if (!isError) handleLogin()
  }

  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center flex-1 pb-20">
      <div className="text-[52px] md:text-[64px] md:flex-1 flex flex-col items-center">
        <div className="flex flex-col font-semibold">
          <div className="tracking-wide">
            <p className="p-0 m-0">Sign In to</p>
            <p className="p-0 m-0">
              <span className="text-primary">AiR</span>Express
            </p>
          </div>
          <p className="p-0 m-0 mt-4 text-[20px]">
            If you dont have an account,
          </p>
          <p className="p-0 m-0 text-[20px]">
            you can{" "}
            <Link to="/register" className="text-primary">
              Register here
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="md:flex-1 w-full flex flex-col justify-center items-center px-12">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => handleChange("email", e.target.value)}
            value={formData.email}
            errorMessage={emailError}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange("password", e.target.value)}
            value={formData.password}
            errorMessage={passwordError}
          />
          <Button
            text="Sign In"
            onClick={handleLoginClick}
            loading={loadingStack.length > 0}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
