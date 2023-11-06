import { Link } from "react-router-dom"
import MenuSVG from "../assets/menu.svg"
import { useState } from "react"

const NavbarDesktop = () => {
  return (
    <div className="hidden lg:flex flex-row px-10 py-3">
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

const NavbarMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuClick = () => {
    setMenuOpen((prevstate) => !prevstate)
  }
  return (
    <>
      <div className="lg:hidden flex flex-row px-10 py-3">
        <div className="flex flex-row flex-1 gap-6">
          <Link to="/" className="font-semibold">
            <span className="text-primary">AiR</span>Express
          </Link>
        </div>
        <div className="flex flex-row">
          <div
            className="flex flex-row items-center hover:cursor-pointer"
            onClick={handleMenuClick}
          >
            <img src={MenuSVG} className="h-4" />
          </div>
        </div>
      </div>
      {menuOpen ? <div>Hello this is menu</div> : null}
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
