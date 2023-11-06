import { Link } from "react-router-dom"
import MenuSVG from "../assets/menu.svg"
import ProfileSVG from "../assets/profile.svg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const NavbarDesktop = () => {
  const navigate = useNavigate()
  const handleProfileClick = () => {
    navigate("/profile")
  }

  return (
    <div className="hidden lg:flex flex-row px-10 py-3">
      <div className="flex flex-row flex-1 gap-6">
        <Link to="/" className="font-semibold">
          <span className="text-primary">AiR</span>Express
        </Link>
        <Link to="/">Home</Link>
      </div>
      <div className="flex flex-row items-center gap-6">
        <img src={ProfileSVG} className="h-7" onClick={handleProfileClick} />
        <Link to="/login" className="text-primary">
          Sign In
        </Link>
      </div>
    </div>
  )
}

const NavbarMobile = () => {
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuClick = () => {
    setMenuOpen((prevstate) => !prevstate)
  }
  const handleProfileClick = () => {
    navigate("/profile")
  }
  return (
    <>
      <div className="lg:hidden flex flex-row px-10 py-3">
        <div className="flex flex-row flex-1 gap-6">
          <Link to="/" className="font-semibold">
            <span className="text-primary">AiR</span>Express
          </Link>
        </div>
        <div className="flex flex-row gap-6 items-center">
          <img src={ProfileSVG} className="h-7" onClick={handleProfileClick} />
          <img
            src={MenuSVG}
            className="h-4 hover:cursor-pointer"
            onClick={handleMenuClick}
          />
        </div>
      </div>
      {menuOpen ? <div className="bg-red-500">Hello this is menu</div> : null}
    </>
  )
}

const Navbar = () => {
  return (
    <>
      <NavbarDesktop />
      <NavbarMobile />
    </>
  )
}

export default Navbar
