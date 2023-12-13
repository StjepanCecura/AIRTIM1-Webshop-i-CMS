import { useEffect, useState } from "react"
import { getLoginStatus } from "../services/lsLoginStatus"
import { getShoppingCart } from "../services/lsShoppingCart"
import Spinner from "../components/Spinner"
import axios from "axios"
import { API_URL } from "../constants"
import CartEmptySVG from "../assets/shopping-cart-empty.svg"

const ShoppingCart = () => {
  const [cartEmpty, setCartEmpty] = useState(true)
  const [loadingStack, setLoadingStack] = useState<number[]>([])

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const getCartByCartId = async (cartId: string) => {
    startLoading()
    await axios
      .get(`${API_URL}/product/getCartById?cartId=${cartId}`)
      .then((res) => {
        console.log("RES -> ", res)
        if (res?.data?.cart?.products.length > 0) {
          // setCartProducts to smthn
          setCartEmpty(false)
        } else {
          setCartEmpty(true)
        }
      })
      .catch((err) => {
        console.log("ERROR -> ", err)
      })
      .finally(() => {
        stopLoading()
      })
  }

  const getCartByUser = async () => {
    startLoading()
    await axios
      .get(`${API_URL}/product/getCartByUser`)
      .then((res) => {
        console.log("RES -> ", res)
        //TODO: fetch cart data by user
        //TODO: if empty -> set cartEmpty to true, if not empty -> display products in cart and set cartEmpty to false
      })
      .catch((err) => {
        console.log("ERROR -> ", err)
      })
      .finally(() => {
        stopLoading()
      })
  }

  useEffect(() => {
    const loginStatus = getLoginStatus()
    if (loginStatus == null) {
      // User is not logged in
      const cartIdFromLS = getShoppingCart()
      if (cartIdFromLS == null || cartIdFromLS == "") {
        setCartEmpty(true)
      } else {
        getCartByCartId(cartIdFromLS)
      }
    }
    if (loginStatus == "true") {
      // User is logged in
      //TODO: fetch cart data by user
      //TODO: if empty -> set cartEmpty to true, if not empty -> display products in cart and set cartEmpty to false
      // method getCartByUser()
    }

    return () => {}
  }, [])

  if (loadingStack.length > 0) {
    return (
      <div className="flex justify-center items-center flex-1">
        <Spinner />
      </div>
    )
  }

  if (cartEmpty) {
    return (
      <div className="flex flex-col gap-8 px-8 py-8 mb-8 justify-center items-center flex-1">
        <div className="flex flex-col justify-center items-center gap-8">
          <img src={CartEmptySVG} width={200} className="mr-8" />
          <h1 className="text-[32px]">Shopping cart is empty</h1>
        </div>
      </div>
    )
  }

  return <div className="flex flex-col gap-8 px-8 py-8 mb-8">SHOPPING CART</div>
}

export default ShoppingCart
