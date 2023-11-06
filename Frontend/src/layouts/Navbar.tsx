import { Link } from "react-router-dom"
import MenuSVG from "../assets/menu.svg"
import ProfileSVG from "../assets/profile.svg"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLoginStatus } from "../services/lsLoginStatus"
import { useLocation } from "react-router-dom"

interface Props {
  loginStatus: string
  handleSignOutClick: () => void
  handleProfileClick: () => void
}

const NavbarDesktop = ({
  loginStatus,
  handleSignOutClick,
  handleProfileClick,
}: Props) => {
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
        {loginStatus == "true" ? (
          <p
            className="text-primary hover:cursor-pointer"
            onClick={handleSignOutClick}
          >
            Sign Out
          </p>
        ) : (
          <Link to="/login" className="text-primary">
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}

const NavbarMobile = ({
  loginStatus,
  handleSignOutClick,
  handleProfileClick,
}: Props) => {
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
        <div className="flex flex-row gap-6 items-center">
          <img src={ProfileSVG} className="h-7" onClick={handleProfileClick} />
          <img
            src={MenuSVG}
            className="h-4 hover:cursor-pointer"
            onClick={handleMenuClick}
          />
        </div>
      </div>
      {menuOpen ? (
        <div className="flex flex-col">
          <Link to="/">Home</Link>
          {loginStatus == "true" ? (
            <p
              className="text-primary hover:cursor-pointer"
              onClick={handleSignOutClick}
            >
              Sign Out
            </p>
          ) : (
            <Link to="/login" className="text-primary">
              Sign In
            </Link>
          )}
        </div>
      ) : null}
    </>
  )
}

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loginStatus, setLoginStatus] = useState("")

  const signOut = async () => {
    console.log("Signing out!")
  }

  const handleProfileClick = () => {
    navigate("/profile")
  }

  const handleSignOutClick = () => {
    signOut()
  }

  useEffect(() => {
    const status = getLoginStatus()
    setLoginStatus(status)
    return () => {}
  }, [location])

  return (
    <>
      <NavbarDesktop
        loginStatus={loginStatus}
        handleProfileClick={handleProfileClick}
        handleSignOutClick={handleSignOutClick}
      />
      <NavbarMobile
        loginStatus={loginStatus}
        handleProfileClick={handleProfileClick}
        handleSignOutClick={handleSignOutClick}
      />
    </>
  )
}

export default Navbar
