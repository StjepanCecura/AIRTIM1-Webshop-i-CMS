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
  const [nameError, setNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [phoneError, setPhoneError] = useState("")

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

  const checkName = () => {
    return formData.name != ""
  }

  const checkLastName = () => {
    return formData.lastName != ""
  }

  const checkPhone = () => {
    return /^\d+$/.test(formData.phone) && formData.phone != ""
  }

  const handleErrorWhileRegister = (error: any) => {
    if (error.body?.errors[0]?.field == "email") {
      setEmailError(error.body?.message)
    } else {
      toast.error("Error while creating an account. Please try again later.")
    }
  }

  const handleRegister = async () => {
    startLoading()
    await axios
      .post(`${API_URL}/customer/register`, { ...formData })
      .then((res) => {
        if (res?.data?.error) {
          handleErrorWhileRegister(res.data.error)
        } else {
          toast("Account created successfully.")
          navigate("/")
        }
      })
      .catch((err) => {
        toast.error("Error while creating an account. Please try again later.")
      })
      .finally(() => {
        stopLoading()
      })
  }

  const verifyFormData = () => {
    const passwordGood = checkPassword()
    const emailGood = checkEmail()
    const nameGood = checkName()
    const lastNameGood = checkLastName()
    const phoneGood = checkPhone()
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
    if (!nameGood) {
      setNameError("Name cannot be empty.")
      error = true
    } else {
      setNameError("")
    }
    if (!lastNameGood) {
      setLastNameError("Last name cannot be empty.")
      error = true
    } else {
      setLastNameError("")
    }
    if (!phoneGood) {
      setPhoneError("Enter correct phone format.")
      error = true
    } else {
      setPhoneError("")
    }
    return error
  }

  const handleRegisterClick = () => {
    const isError = verifyFormData()
    if (!isError) handleRegister()
  }

  return (
    <div className="pb-20 flex flex-col md:flex-row justify-evenly items-center flex-1">
      <div className="text-[52px] md:text-[64px] md:flex-1  flex flex-col items-center">
        <div className="flex flex-col font-semibold tracking-wide">
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
            errorMessage={nameError}
          />
          <Input
            type="text"
            placeholder="Last name"
            onChange={(e) => handleChange("lastName", e.target.value)}
            value={formData.lastName}
            errorMessage={lastNameError}
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
            errorMessage={phoneError}
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
