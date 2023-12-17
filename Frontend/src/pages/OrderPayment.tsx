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
import { toast } from "react-toastify"

const OrderPayment = () => {
  const location = useLocation()

  const [loadingStack, setLoadingStack] = useState<number[]>([])
  const [cartId, setCartId] = useState("")
  const [cartVersion, setCartVersion] = useState<number>()
  const [cartTotal, setCartTotal] = useState()
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expireDate: "",
    cvv: "",
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

  const makeOrder = async () => {
    startLoading()
    await axios
      .post(`${API_URL}/product/createOrder`, {
        cartId: cartId,
        version: cartVersion,
      })
      .then((res) => {
        if (res?.status == 200) {
          if (res?.data?.success == true) {
            toast("Order placed successfully.")
          }
        }
        if (res?.data?.error) {
          toast.error("Error while placing order. Please try again later.")
        }
      })
      .catch((err) => {
        toast.error("Error while placing order. Please try again later.")
      })
      .finally(() => {
        stopLoading()
      })
  }

  const handleFinishOrder = () => {
    makeOrder()
  }

  useEffect(() => {
    if (location != undefined) {
      setCartId(location.state.cartId)
      setCartTotal(location.state.cartTotal)
      setCartVersion(location.state.cartVersion)
    }

    return () => {}
  }, [location])

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
        <p>{cartVersion}</p> */}
        <hr />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex flex-col justify-start w-full">
              <p>Card number:</p>
              <Input
                type="text"
                placeholder="Card number"
                onChange={(e) => handleChange("cardNumber", e.target.value)}
                value={paymentData.cardNumber}
              />
            </div>
            <div className="flex flex-col justify-start w-full">
              <p>Expire date:</p>
              <Input
                type="text"
                placeholder="Expire date"
                onChange={(e) => handleChange("expireDate", e.target.value)}
                value={paymentData.expireDate}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <p>CVV:</p>
            <Input
              type="text"
              placeholder="CVV"
              onChange={(e) => handleChange("cvv", e.target.value)}
              value={paymentData.cvv}
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
