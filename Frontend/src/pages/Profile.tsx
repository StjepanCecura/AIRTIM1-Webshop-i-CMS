import { useEffect, useState } from "react"
import { Customer } from "../interfaces/customer.interface"
import axios from "axios"
import { API_URL } from "../constants"
import Spinner from "../components/Spinner"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Profile = () => {
  const [customer, setCustomer] = useState<Customer>({
    firstName: "",
    email: "",
    phoneNumber: "",
  })
  const [loadingStack, setLoadingStack] = useState<number[]>([])
  const navigate = useNavigate()

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const getCustomerData = async () => {
    startLoading()
    await axios
      .get(`${API_URL}/customer`)
      .then((res) => {
        const firstName = res?.data?.userData?.firstName
        const email = res?.data?.userData?.email
        const phoneNumber = res?.data?.userData?.phoneNumber
        setCustomer({
          firstName: firstName,
          email: email,
          phoneNumber: phoneNumber,
        })
      })
      .catch((err) => {
        if (err?.response.status != 403) {
          toast.error("Error loading profile. Please try again later.")
          navigate("/")
        }
        // if (err?.response.status == 403) {
        //   navigate("/login")
        // } else {
        //   toast.error("Error loading profile. Please try again later.")
        //   navigate("/login")
        // }
      })
      .finally(() => {
        stopLoading()
      })
  }

  useEffect(() => {
    getCustomerData()
    return () => {}
  }, [])

  if (loadingStack.length > 0) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col px-10">
      <p>Hello, {customer.firstName}!</p>
      <p>Email: {customer.email}</p>
      <p>Phone number: {customer.phoneNumber}</p>
    </div>
  )
}

export default Profile
