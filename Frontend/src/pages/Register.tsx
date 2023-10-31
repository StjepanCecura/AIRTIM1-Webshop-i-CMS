import Button from "../components/Button"
import Input from "../components/Input"

function Register() {
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
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Last name" />
          <Input type="text" placeholder="Email" />
          <Input type="text" placeholder="Phone" />
          <Input type="password" placeholder="Password" />
          <Button
            text="Create account"
            onClick={() => {
              console.log("BOK")
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Register
// max-w-sm
