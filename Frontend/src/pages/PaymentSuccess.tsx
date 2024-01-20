import { useContext, useEffect, useState } from "react"
import SuccessSVG from "../assets/success.svg"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { getLoginStatus } from "../services/lsLoginStatus"
import {
  getShoppingCart,
  removeShoppingCartId,
  setShoppingCartId,
} from "../services/lsShoppingCart"
import axios from "axios"
import { API_URL } from "../constants"
import { toast } from "react-toastify"
import { CartContext } from "../services/CartContext"
import Spinner from "../components/Spinner"

const PaymentSuccess = () => {
  const navigate = useNavigate()

  const { setCardContextState } = useContext(CartContext)
  const [loadingStack, setLoadingStack] = useState<number[]>([])

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const handleHomeClick = () => {
    navigate("/")
  }

  const deleteCart = async (cartId: string, cartVersion: number) => {
    await axios
      .post(`${API_URL}/receipts/deleteCart`, {
        cartId: cartId,
        cartVersion: cartVersion,
      })
      .then((res) => {
        if (res?.status == 200) {
          if (res?.data?.success == true) {
          }
        }
      })
      .catch((err) => {})
      .finally(() => {})
  }

  const getCartIdByUser = async () => {
    let cartId: string | null
    await axios
      .get(`${API_URL}/receipts/getCartByCustomerId`)
      .then((res) => {
        if (res?.data?.cartId !== null) {
          cartId = res?.data?.cartId
        } else {
          cartId = null
        }
      })
      .catch((err) => {
        cartId = null
      })
    return cartId
  }

  const getCartVersionByCartId = async (cartId: string) => {
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
      .finally(() => {})
    return version
  }

  const getCartId = async () => {
    let cartId: string | null
    const loginStatusFromLS = getLoginStatus()
    if (loginStatusFromLS == null) {
      // User is not logged in
      const cartIdFromLS = getShoppingCart()
      if (cartIdFromLS == null || cartIdFromLS == "") {
        cartId = null
      } else {
        cartId = cartIdFromLS
      }
    }
    if (loginStatusFromLS == "true") {
      // User is logged in
      cartId = await getCartIdByUser()
    }
    return cartId
  }

  const makeOrder = async (cartId: string, _cartVersion: number) => {
    let success = await axios
      .post(`${API_URL}/receipts/createOrder`, {
        cartId: cartId,
        version: _cartVersion,
      })
      .then((res) => {
        if (res?.status == 200) {
          if (res?.data?.success == true) {
            return true
          }
        }
        if (res?.data?.error) {
          return false
        }
      })
      .catch((err) => {
        return false
      })
      .finally(() => {})
    return success
  }

  const handleFinishOrder = async () => {
    startLoading()
    const cartId = await getCartId()
    const _cartVersion = await getCartVersionByCartId(cartId)
    console.log("VERSION -> ", _cartVersion)
    console.log("ID -> ", cartId)
    const orderSuccess = await makeOrder(cartId, _cartVersion)
    if (orderSuccess) {
      toast("Order placed successfully.")
      const _cartVersion = await getCartVersionByCartId(cartId)
      deleteCart(cartId, _cartVersion)
      setShoppingCartId(null)
      setCardContextState(false)
    } else {
      setCardContextState(true)
    }
    const loginStatus = getLoginStatus()
    if (loginStatus != "true") {
      removeShoppingCartId()
    }
    stopLoading()
  }

  useEffect(() => {
    handleFinishOrder()
    return () => {}
  }, [])

  if (loadingStack.length > 0) {
    return (
      <div className="flex justify-center items-center flex-1">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-1 justify-center items-center flex-col gap-7">
      <img src={SuccessSVG} alt="" className="h-[10rem] ml-4" />
      <p className="text-[36px] text-center">Payment Successful</p>
      <p className="text-[20px] text-center">Thank you for shopping with us!</p>

      <div className="w-[300px] mt-4">
        <Button text="Continue shopping" onClick={handleHomeClick} />
      </div>
    </div>
  )
}

export default PaymentSuccess
