const CartProduct = () => {
  return (
    <div className="flex flex-row gap-8 p-4">
      <div style={{ flex: 1 }} className="flex justify-center items-center">
        <p>IMAGE</p>
      </div>
      <div style={{ flex: 4 }} className="flex flex-col gap-4 items-start">
        <h1>Title</h1>
        <p>Size</p>
        <p>Color</p>
        <p>Quantity</p>
      </div>
    </div>
  )
}

export default CartProduct
