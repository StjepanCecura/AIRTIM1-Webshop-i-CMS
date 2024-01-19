import { useContext, useEffect, useState } from "react"
import { getLoginStatus } from "../services/lsLoginStatus"
import { getShoppingCart } from "../services/lsShoppingCart"
import Spinner from "../components/Spinner"
import axios from "axios"
import { API_URL } from "../constants"
import CartEmptySVG from "../assets/shopping-cart-empty.svg"
import { ICartProduct } from "../interfaces/cartProduct.interface"
import CartProduct from "../components/CartProduct"
import Button from "../components/Button"
import { CartContext } from "../services/CartContext"
import { useNavigate } from "react-router-dom"

const ShoppingCart = () => {
  const [cartEmpty, setCartEmpty] = useState(true)
  const [loadingStack, setLoadingStack] = useState<number[]>([])
  const [cartProducts, setCartProducts] = useState<Array<ICartProduct>>()
  const [cartTotal, setCartTotal] = useState(0)
  const [loginStatus, setLoginStatus] = useState(false)
  const [currentCartId, setCurrentCartId] = useState("")

  const navigate = useNavigate()

  const { setCardContextState } = useContext(CartContext)

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const getCartByCartId = async (cartId: string) => {
    startLoading()
    await axios
      .get(`${API_URL}/receipts/getCartById?cartId=${cartId}`)
      .then((res) => {
        if (res?.data?.products.length > 0) {
          setCartEmpty(false)
          setCartProducts(res?.data?.products)
          setCartTotal(res?.data?.totalPrice)
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

  const createCartForUser = async () => {
    startLoading()
    await axios
      .post(`${API_URL}/receipts/createCartForUser`)
      .then((res) => {
        if (res?.status == 200) {
        }
        if (res?.data?.error) {
          console.log("createCartForUser ERROR 1 -> ", res?.data?.error)
        }
      })
      .catch((err) => {
        console.log("createCartForUser ERROR 2 -> ", err)
      })
      .finally(() => {
        stopLoading()
      })
  }

  const getCartByUser = async () => {
    startLoading()
    await axios
      .get(`${API_URL}/receipts/getCartByCustomerId`)
      .then((res) => {
        // console.log("RES USER -> ", res)
        if (res?.data?.cartId === null) {
          // User doesn't have registered cart -> make one
          createCartForUser()
          setCartEmpty(true)
        } else {
          getCartByCartId(res?.data?.cartId)
          setCurrentCartId(res?.data?.cartId)
        }
      })
      .catch((err) => {
        console.log("ERROR -> ", err)
      })
      .finally(() => {
        stopLoading()
      })
  }

  const handleGoToCheckoutClick = () => {
    navigate("/order", {
      state: { cartTotal: cartTotal, cartId: currentCartId },
    })
  }

  useEffect(() => {
    const loginStatusFromLS = getLoginStatus()
    if (loginStatusFromLS == "true") setLoginStatus(true)
    else setLoginStatus(false)
    if (loginStatusFromLS == null) {
      // User is not logged in
      const cartIdFromLS = getShoppingCart()
      if (cartIdFromLS == null || cartIdFromLS == "") {
        setCartEmpty(true)
      } else {
        getCartByCartId(cartIdFromLS)
        // Set state
        setCurrentCartId(cartIdFromLS)
      }
    }
    if (loginStatusFromLS == "true") {
      // User is logged in
      getCartByUser()
    }

    return () => {}
  }, [])

  useEffect(() => {
    if (cartEmpty === true) {
      setCardContextState(false)
    } else {
      setCardContextState(true)
    }

    return () => {}
  }, [cartEmpty])

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

  return (
    <>
      <p className="text-center text-[36px] font-semibold pt-8">
        Shopping Cart
      </p>
      <div className="flex flex-col gap-8 md:px-60 py-8">
        {cartProducts.map((product) => {
          return (
            <CartProduct
              key={product.productId}
              getCartByCartId={getCartByCartId}
              productData={product}
              loginStatus={loginStatus}
              cartId={currentCartId}
              cartTotal={cartTotal}
              setCartTotal={setCartTotal}
            />
          )
        })}
      </div>
      <div className="flex flex-col justify-center px-8 pb-8">
        <p className="text-[24px] text-right px-8">
          Total:{" "}
          <span className="text-primary font-semibold">
            {cartTotal.toFixed(2).toString().replace(".", ",")} €
          </span>
        </p>
        <hr className="my-8" />
        <div className="flex justify-center w-full">
          <div className="w-[500px]">
            <Button
              text="Go to checkout"
              onClick={() => handleGoToCheckoutClick()}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ShoppingCart
