import Input from "../components/Input"

function Register() {
  return (
    <div className="flex flex-col md:flex-row w-full  justify-evenly h-screen items-center">
      <div className="text-[64px] flex-1  flex flex-col items-center">
        <div className="flex flex-col font-semibold tracking-wide">
          <p className="p-0 m-0">Create</p>
          <p className="p-0 m-0">
            <span className="text-primary">AiR</span>Express
          </p>
          <p className="p-0 m-0">account</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-1/2 max-w-sm flex flex-col gap-4">
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Last name" />
          <Input type="text" placeholder="Email" />
          <Input type="text" placeholder="Phone" />
          <Input type="password" placeholder="Password" />
        </div>
      </div>
    </div>
  )
}

export default Register
