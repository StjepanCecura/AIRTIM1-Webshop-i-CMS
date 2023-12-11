// CartContext.js
import { createContext, useState } from "react"

const CartContext = createContext(null)

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState("")

  const setCardContextId = (id: string) => {
    setCart(id)
  }

  return (
    <CartContext.Provider value={{ cart, setCardContextId }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider, CartContext }
