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
import { toast } from "react-toastify"
import { ICartProduct } from "../interfaces/cartProduct.interface"
import { loadStripe } from "@stripe/stripe-js"

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
  const [cartProducts, setCartProducts] = useState<Array<ICartProduct>>()

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
      .get(`${API_URL}/receipts/getCartById?cartId=${cartId}`)
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

  const addShippingDetailsToCart = async () => {
    startLoading()
    await axios
      .post(`${API_URL}/receipts/addShippingAddress`, {
        cartId: cartId,
        version: cartVersion,
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        email: orderData.email,
        phone: orderData.phoneNumber,
        country: orderData.country,
        city: orderData.city,
        postalCode: orderData.postalCode,
        streetName: orderData.streetName,
        streetNumber: orderData.streetNumber,
      })
      .then((res) => {
        if (res?.status == 200) {
          if (res?.data?.success == true) {
            // navigate("/order-payment", {
            //   state: {
            //     cartTotal: cartTotal,
            //     cartId: cartId,
            //   },
            // })
          }
        }
        if (res?.data?.error) {
          toast.error("Error while saving changes. Please try again later.")
        }
      })
      .catch((err) => {
        toast.error("Error while saving changes. Please try again later.")
      })
      .finally(() => {
        stopLoading()
      })
  }

  const verifyShippingDetails = () => {
    let error = false
    if (orderData.firstName == "") error = true
    if (orderData.lastName == "") error = true
    if (orderData.email == "") error = true
    if (orderData.phoneNumber == "") error = true
    if (orderData.city == "") error = true
    if (orderData.country == "") error = true
    if (orderData.postalCode == "") error = true
    if (orderData.streetName == "") error = true
    if (orderData.streetNumber == "") error = true
    return error
  }

  const getCartByCartId = async (cartId: string) => {
    startLoading()
    let cartProducts: Array<ICartProduct> | null
    await axios
      .get(`${API_URL}/receipts/getCartById?cartId=${cartId}`)
      .then((res) => {
        if (res?.data?.products.length > 0) {
          cartProducts = res?.data?.products
        } else {
          cartProducts = null
        }
      })
      .catch((err) => {
        console.log("ERROR -> ", err)
        cartProducts = null
      })
      .finally(() => {
        stopLoading()
      })
    return cartProducts
  }

  const makePayment = async (cartProducts: Array<ICartProduct>) => {
    startLoading()
    const stripe = await loadStripe(
      "pk_test_51OaaSWJBVMfA4T8SROWZEc1uKiO6OsN0Yxf0tguDPCyEcBj6SNQ5NwNJ9tiwbxDRJ8IbVzFojxEGRp4k9io7UNev00B2BPGOBj"
    )

    const body = {
      products: cartProducts,
    }
    const headers = {
      "Content-Type": "application/json",
    }
    const response = await fetch(`${API_URL}/receipts/createCheckoutSession`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
    const session = await response.json()

    if (session.id != null) {
      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      })
    } else {
      toast.error("Error. Please try again later.")
    }
    stopLoading()
  }

  const startPaymentProcess = async () => {
    const cartProducts = await getCartByCartId(cartId)
    if (cartProducts != null && cartProducts.length > 0) {
      makePayment(cartProducts)
    }
  }

  const handleGoToNextStep = () => {
    const verifyError = verifyShippingDetails()
    if (verifyError === true) {
      toast("Please enter all shipping details.")
    } else {
      addShippingDetailsToCart()
      startPaymentProcess()
    }
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
      <div className="flex flex-col gap-2 justify-center items-center md:px-[20%] lg:px-[20%]">
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
