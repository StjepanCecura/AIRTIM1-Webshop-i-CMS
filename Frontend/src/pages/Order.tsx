import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Input from "../components/Input"
import Spinner from "../components/Spinner"
import axios from "axios"
import { API_URL } from "../constants"

const Order = () => {
  const location = useLocation()

  const [loadingStack, setLoadingStack] = useState<number[]>([])
  const [cartId, setCartId] = useState("")
  const [cartVersion, setCartVersion] = useState<number>()
  const [cartTotal, setCartTotal] = useState()
  const [orderData, setOrderData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
  })

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const getCartVersionByCartId = async (cartId: string) => {
    startLoading()
    let version: number | null
    await axios
      .get(`${API_URL}/product/getCartById?cartId=${cartId}`)
      .then((res) => {
        if ((res?.data?.version ?? "") != "") {
          version = res?.data?.version
        } else {
          version = null
        }
      })
      .catch((err) => {
        console.log("ERROR -> ", err)
        version = null
      })
      .finally(() => {
        stopLoading()
      })
    setCartVersion(version)
  }

  const handleChange = (
    key: keyof typeof orderData,
    value: number | string | boolean
  ) => {
    setOrderData({
      ...orderData,
      [key]: value,
    })
  }

  useEffect(() => {
    if (location != undefined) {
      setCartId(location.state.cartId)
      setCartTotal(location.state.cartTotal)
    }

    return () => {}
  }, [location])

  useEffect(() => {
    if (cartId != undefined && cartId != "" && cartId != null)
      getCartVersionByCartId(cartId)
    return () => {}
  }, [cartId])

  if (loadingStack.length > 0) {
    return (
      <div className="flex justify-center items-center flex-1">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col px-8 py-8 gap-8">
      <div className="flex flex-col gap-2">
        <p>{cartId}</p>
        <p>{cartTotal}</p>
        <hr />
        <Input
          type="text"
          placeholder="Address"
          onChange={(e) => handleChange("address", e.target.value)}
          value={orderData.address}
        />
      </div>
    </div>
  )
}

export default Order
