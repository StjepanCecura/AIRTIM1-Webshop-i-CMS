export const getShoppingCart = () => {
  return localStorage.getItem("shoppingCart")
}

export const setShoppingCartId = (id: string) => {
  localStorage.setItem("shoppingCart", id)
}

export const removeShoppingCartId = () => {
  localStorage.removeItem("shoppingCart")
}
