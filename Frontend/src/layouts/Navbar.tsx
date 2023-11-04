import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex flex-row px-10 py-3">
      <div className="flex flex-row flex-1 gap-6">
        <Link to="/" className="font-semibold">
          <span className="text-primary">AiR</span>Express
        </Link>
        <Link to="/">Home</Link>
      </div>
      <div className="flex flex-row">
        <Link to="/login" className="text-primary">
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default Navbar
