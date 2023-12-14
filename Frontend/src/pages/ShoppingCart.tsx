import { useEffect, useState } from "react"
import { getLoginStatus } from "../services/lsLoginStatus"
import { getShoppingCart } from "../services/lsShoppingCart"
import Spinner from "../components/Spinner"
import axios from "axios"
import { API_URL } from "../constants"
import CartEmptySVG from "../assets/shopping-cart-empty.svg"
import { ICartProduct } from "../interfaces/cartProduct.interface"
import CartProduct from "../components/CartProduct"
import Button from "../components/Button"

const ShoppingCart = () => {
  const [cartEmpty, setCartEmpty] = useState(true)
  const [loadingStack, setLoadingStack] = useState<number[]>([])
  const [cartProducts, setCartProducts] = useState<Array<ICartProduct>>()
  const [cartTotal, setCartTotal] = useState(0)

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
        if (res?.data?.products.length > 0) {
          // setCartProducts to smthn
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

  const getCartByUser = async () => {
    startLoading()
    await axios
      .get(`${API_URL}/product/getCartByCustomerId`)
      .then((res) => {
        console.log("RES USER -> ", res)
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

  const handleGoToCheckoutClick = () => {
    alert("BOK")
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
      getCartByUser()
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

  return (
    <>
      <p className="text-center text-[36px] font-semibold pt-8">
        Shopping Cart
      </p>
      <div className="flex flex-col gap-8 px-60 py-8">
        {cartProducts.map((product) => {
          return <CartProduct key={product.productId} productData={product} />
        })}
      </div>
      <div className="flex flex-col justify-center px-8 pb-8">
        <p className="text-[24px] text-right px-8">
          Total:{" "}
          <span className="text-primary font-semibold">
            {cartTotal.toFixed(2).toString().replace(".", ",")} €
          </span>
        </p>
        <br />
        <hr />
        <br />
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
