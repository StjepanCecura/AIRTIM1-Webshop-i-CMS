import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Input from "../components/Input"
import Spinner from "../components/Spinner"
import axios from "axios"
import { API_URL } from "../constants"
import SelectList from "../components/SelectList"
import { ISelect } from "../interfaces/select.interface"
import Button from "../components/Button"
import { ICustomer } from "../interfaces/customer.interface"
import { getLoginStatus } from "../services/lsLoginStatus"

const countries = [{ value: "HR", label: "Croatia" }]

const Order = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [loadingStack, setLoadingStack] = useState<number[]>([])
  const [cartId, setCartId] = useState("")
  const [cartVersion, setCartVersion] = useState<number>()
  const [cartTotal, setCartTotal] = useState()
  const [orderData, setOrderData] = useState<ICustomer>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    addressId: "",
    city: "",
    country: "",
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

  const getCustomerData = async () => {
    startLoading()
    await axios
      .get(`${API_URL}/customer`)
      .then((res) => {
        const id = res?.data?.userData?.id ?? ""
        const firstName = res?.data?.userData?.firstName ?? ""
        const lastName = res?.data?.userData?.lastName ?? ""
        const email = res?.data?.userData?.email ?? ""
        const phoneNumber = res?.data?.userData?.phoneNumber ?? ""
        const addressId = res?.data?.userData?.address?.id ?? ""
        const city = res?.data?.userData?.address?.city ?? ""
        const country = res?.data?.userData?.address?.country ?? ""
        const postalCode = res?.data?.userData?.address?.postalCode ?? ""
        const streetName = res?.data?.userData?.address?.streetName ?? ""
        const streetNumber = res?.data?.userData?.address?.streetNumber ?? ""

        setOrderData({
          id: id,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          addressId: addressId,
          city: city,
          country: country,
          postalCode: postalCode,
          streetName: streetName,
          streetNumber: streetNumber,
        })
        if (country != "") {
          let c = countries.find((c) => c.value == country)
          setCountry(c)
        }
      })
      .catch((err) => {
        if (err?.response.status != 403) {
          console.log("403 -> Order")
        }
      })
      .finally(() => {
        stopLoading()
      })
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

  const handleGoToNextStep = () => {
    navigate("/order-payment", {
      state: { cartTotal: cartTotal, cartId: cartId, cartVersion: cartVersion },
    })
  }

  useEffect(() => {
    const loginStatus = getLoginStatus()
    if (loginStatus == "true") getCustomerData()
    return () => {}
  }, [])

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

  useEffect(() => {
    if (country != undefined && country != null) {
      setOrderData({
        ...orderData,
        country: country.value,
      })
    }

    return () => {}
  }, [country])

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
        Shipping Details
      </p>
      <div className="flex flex-col gap-2 justify-center items-center md:px-96">
        {/* <p>{cartId}</p>
        <p>{cartTotal}</p>
        <hr /> */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex flex-col justify-start w-full">
              <p>First name:</p>
              <Input
                type="text"
                placeholder="First name"
                onChange={(e) => handleChange("firstName", e.target.value)}
                value={orderData.firstName}
              />
            </div>
            <div className="flex flex-col justify-start w-full">
              <p>Last name:</p>
              <Input
                type="text"
                placeholder="Last name"
                onChange={(e) => handleChange("lastName", e.target.value)}
                value={orderData.lastName}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <p>Email:</p>
            <Input
              type="text"
              placeholder="Email"
              onChange={(e) => handleChange("email", e.target.value)}
              value={orderData.email}
            />
          </div>
          <div className="flex flex-col justify-start">
            <p>Phone:</p>
            <Input
              type="text"
              placeholder="Phone"
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              value={orderData.phoneNumber}
            />
          </div>
          <div className="flex flex-col justify-start">
            <p>Country:</p>
            <SelectList
              options={countries}
              placeholder="Country"
              setSelectedOption={setCountry}
              selectedOption={country}
            />
          </div>
          <div className="flex flex-col justify-start">
            <p>Postal code:</p>
            <Input
              type="text"
              placeholder="Postal code"
              onChange={(e) => handleChange("postalCode", e.target.value)}
              value={orderData.postalCode}
            />
          </div>
          <div className="flex flex-col justify-start">
            <p>City:</p>
            <Input
              type="text"
              placeholder="City"
              onChange={(e) => handleChange("city", e.target.value)}
              value={orderData.city}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex flex-col justify-start w-full">
              <p>Street name:</p>
              <Input
                type="text"
                placeholder="Street name"
                onChange={(e) => handleChange("streetName", e.target.value)}
                value={orderData.streetName}
              />
            </div>
            <div className="flex flex-col justify-start w-full">
              <p>Street number:</p>
              <Input
                type="text"
                placeholder="Street number"
                onChange={(e) => handleChange("streetNumber", e.target.value)}
                value={orderData.streetNumber}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full mt-8">
          <div className="w-[500px]">
            <Button text="Go to payment" onClick={() => handleGoToNextStep()} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
