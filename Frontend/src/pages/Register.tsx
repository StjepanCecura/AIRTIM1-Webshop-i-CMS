import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  })

  const handleChange = (
    key: keyof typeof formData,
    value: number | string | boolean
  ) => {
    setFormData({
      ...formData,
      [key]: value,
    })
  }
  return (
    <div className="flex flex-col md:flex-row w-full justify-evenly h-screen items-center">
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
          />
          <Button
            text="Create account"
            onClick={() => {
              console.log("BOK -> ", formData)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Register
// max-w-sm
