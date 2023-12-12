import { useEffect, useState } from "react"
import { getLoginStatus } from "../services/lsLoginStatus"
import { getShoppingCart } from "../services/lsShoppingCart"

const ShoppingCart = () => {
  const [cartEmpty, setCartEmpty] = useState(true)

  useEffect(() => {
    const loginStatus = getLoginStatus()
    if (loginStatus == null) {
      // User is not logged in
      const cartIdFromLS = getShoppingCart()
      if (cartIdFromLS == null || cartIdFromLS == "") {
        setCartEmpty(true)
      } else {
        setCartEmpty(false)
        //TODO: fetch cart data by cart id and check if it's empty or not
        //TODO: if empty -> message and set to true, if not empty -> display products in cart
      }
    }
    if (loginStatus == "true") {
      // User is logged in
      //TODO: fetch cart data by user
      //TODO: if empty -> message and set to true, if not empty -> display products in cart
    }

    return () => {}
  }, [])

  if (cartEmpty) {
    return (
      <div className="flex flex-col gap-8 px-8 py-8 mb-8">
        SHOPPING CART IS EMPTY
      </div>
    )
  }

  return <div className="flex flex-col gap-8 px-8 py-8 mb-8">SHOPPING CART</div>
}

export default ShoppingCart
