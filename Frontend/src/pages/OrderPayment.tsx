import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Input from "../components/Input"
import Spinner from "../components/Spinner"
import axios from "axios"
import { API_URL } from "../constants"
import SelectList from "../components/SelectList"
import { ISelect } from "../interfaces/select.interface"
import Button from "../components/Button"
import { getLoginStatus } from "../services/lsLoginStatus"

const OrderPayment = () => {
  const location = useLocation()

  const [loadingStack, setLoadingStack] = useState<number[]>([])
  const [cartId, setCartId] = useState("")
  const [cartVersion, setCartVersion] = useState<number>()
  const [cartTotal, setCartTotal] = useState()
  const [paymentData, setPaymentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: { value: "", label: "" },
    city: "",
    postalCode: "",
    streetName: "",
    streetNumber: "",
  })
  const [country, setCountry] = useState<ISelect>()

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const handleChange = (
    key: keyof typeof paymentData,
    value: number | string | boolean
  ) => {
    setPaymentData({
      ...paymentData,
      [key]: value,
    })
  }

  const handleFinishOrder = () => {}

  // useEffect(() => {
  //   if (location != undefined) {
  //     setCartId(location.state.cartId)
  //     setCartTotal(location.state.cartTotal)
  //   }

  //   return () => {}
  // }, [location])

  if (loadingStack.length > 0) {
    return (
      <div className="flex justify-center items-center flex-1">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col px-8 gap-8 mb-8">
      <p className="text-center text-[36px] font-semibold pt-8">
        Payment Details
      </p>
      <div className="flex flex-col gap-2 justify-center items-center md:px-96">
        {/* <p>{cartId}</p>
        <p>{cartTotal}</p>
        <hr /> */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex flex-col justify-start w-full">
              <p>Card number:</p>
              <Input
                type="text"
                placeholder="First name"
                onChange={(e) => handleChange("firstName", e.target.value)}
                value={paymentData.firstName}
              />
            </div>
            <div className="flex flex-col justify-start w-full">
              <p>Last name:</p>
              <Input
                type="text"
                placeholder="Last name"
                onChange={(e) => handleChange("lastName", e.target.value)}
                value={paymentData.lastName}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <p>Phone:</p>
            <Input
              type="text"
              placeholder="Phone"
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              value={paymentData.phoneNumber}
            />
          </div>
        </div>
        <div className="flex justify-center w-full mt-8">
          <div className="w-[500px]">
            <Button text="Finish order" onClick={() => handleFinishOrder()} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderPayment
