// CartContext.js
import { createContext, useState } from "react"

const CartContext = createContext(null)

const CartProvider = ({ children }) => {
  const [cartContextState, setCartContext] = useState(false)

  const setCardContextState = (state: boolean) => {
    setCartContext(state)
  }

  return (
    <CartContext.Provider value={{ cartContextState, setCardContextState }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider, CartContext }
