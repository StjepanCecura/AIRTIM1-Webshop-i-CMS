import { Link } from "react-router-dom"
import MenuSVG from "../assets/menu.svg"
import ProfileSVG from "../assets/profile.svg"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLoginStatus } from "../services/lsLoginStatus"
import { useLocation } from "react-router-dom"
import { API_URL } from "../constants"
import axios from "axios"
import { toast } from "react-toastify"

interface Props {
  loginStatus: string
  handleSignOutClick: () => void
  handleProfileClick: () => void
  handleSignInClick: () => void
}

const NavbarDesktop = ({
  loginStatus,
  handleSignOutClick,
  handleProfileClick,
  handleSignInClick,
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
          <p
            className="text-primary hover:cursor-pointer"
            onClick={handleSignInClick}
          >
            Sign In
          </p>
        )}
      </div>
    </div>
  )
}

const NavbarMobile = ({
  loginStatus,
  handleSignOutClick,
  handleProfileClick,
  handleSignInClick,
}: Props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuClick = () => {
    setMenuOpen((prevstate) => !prevstate)
  }

  return (
    <>
      <div className="lg:hidden flex flex-row px-2 py-3">
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
        <div className="flex flex-col mb-4">
          <div className="border-b-primary border">
            <Link to="/">
              <p className="p-2">Home</p>
            </Link>
          </div>

          {loginStatus == "true" ? (
            <div className=" border-b-primary border">
              <p
                className="text-primary hover:cursor-pointer p-0"
                onClick={handleSignOutClick}
              >
                Sign Out
              </p>
            </div>
          ) : (
            <div className="p-2 border-b-primary border">
              <p
                className="text-primary hover:cursor-pointer p-0"
                onClick={handleSignInClick}
              >
                Sign In
              </p>
            </div>
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
    await axios
      .get(`${API_URL}/customer/sign-out`)
      .then((res) => {})
      .catch((err) => {
        if (err?.response.status != 403) {
          toast.error("Error signing out. Please try again later.")
        }
      })
  }

  const handleProfileClick = () => {
    navigate("/profile")
  }

  const handleSignOutClick = () => {
    signOut()
  }

  const handleSignInClick = () => {
    navigate("/login")
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
        handleSignInClick={handleSignInClick}
      />
      <NavbarMobile
        loginStatus={loginStatus}
        handleProfileClick={handleProfileClick}
        handleSignOutClick={handleSignOutClick}
        handleSignInClick={handleSignInClick}
      />
    </>
  )
}

export default Navbar
