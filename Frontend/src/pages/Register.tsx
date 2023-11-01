import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import axios from "axios"
import { API_URL } from "../constants"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Register() {
  const navigate = useNavigate()
  const [loadingStack, setLoadingStack] = useState<number[]>([])
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
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
    return formData.password.length >= 6
  }

  const checkEmail = () => {
    return /\S+@\S+\.\S+/.test(formData.email)
  }

  const handleRegister = async () => {
    startLoading()
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    //
    await axios
      .post(`${API_URL}/user`, { ...formData })
      .then((res) => {
        console.log("Register - handleRegister - res: ", res)
        toast("Account created successfully.")
        navigate("/")
      })
      .catch((err) => {
        console.log("Register - handleRegister - error: ", err)
        toast.error("Error creating an account. Please try again later.")
      })
      .finally(() => {
        stopLoading()
      })
  }

  const handleRegisterClick = () => {
    const passwordGood = checkPassword()
    const emailGood = checkEmail()
    let error = false
    if (!passwordGood) {
      setPasswordError("Password has to be at least 6 characters long.")
      error = true
    } else {
      setPasswordError("")
    }
    if (!emailGood) {
      setEmailError("Enter correct email format.")
      error = true
    } else {
      setEmailError("")
    }
    if (!error) handleRegister()
  }

  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center flex-1">
      <div className="text-[64px] md:flex-1  flex flex-col items-center">
        <div className="flex flex-col font-semibold tracking-wide items-center md:items-start">
          <p className="p-0 m-0">Create</p>
          <p className="p-0 m-0">
            <span className="text-primary">AiR</span>Express
          </p>
          <p className="p-0 m-0">account</p>
        </div>
      </div>
      <div className="md:flex-1 w-full flex flex-col justify-center items-center px-12">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Name"
            onChange={(e) => handleChange("name", e.target.value)}
            value={formData.name}
          />
          <Input
            type="text"
            placeholder="Last name"
            onChange={(e) => handleChange("lastName", e.target.value)}
            value={formData.lastName}
          />
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => handleChange("email", e.target.value)}
            value={formData.email}
            errorMessage={emailError}
          />
          <Input
            type="text"
            placeholder="Phone"
            onChange={(e) => handleChange("phone", e.target.value)}
            value={formData.phone}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange("password", e.target.value)}
            value={formData.password}
            errorMessage={passwordError}
          />
          <Button
            text="Create account"
            onClick={handleRegisterClick}
            loading={loadingStack.length > 0}
          />
        </div>
      </div>
    </div>
  )
}

export default Register
