import { useEffect, useState } from "react"
import { ICartProduct } from "../interfaces/cartProduct.interface"
import TrashSVG from "../assets/trash.svg"

const CartProduct = ({ productData }: { productData: ICartProduct }) => {
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")

  const modifyData = () => {
    const data = productData.variantKey.split("-")
    setSize(data[data.length - 1])
    setColor(data[data.length - 3])
  }

  const handleReduceQuantity = () => {}

  const handleAddQuantity = () => {}

  const handleRemoveFromCart = async () => {}

  useEffect(() => {
    modifyData()

    return () => {}
  }, [])

  return (
    <div className="flex flex-row gap-8 px-12">
      <div className="flex justify-center items-center">
        <img
          src={productData.image}
          width={300}
          className="bg-slate-100 p-4 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-4 items-start justify-center">
        <p className="text-[20px] font-semibold">{productData.productName}</p>
        <p className="capitalize">Variant: {color}</p>
        <p>Size: {size}</p>
        <p>Quantity:</p>

        <div className="flex items-center gap-2">
          <div
            onClick={handleReduceQuantity}
            className="rounded-lg px-4 py-1 bg-tetriary hover:cursor-pointer"
          >
            <p className="select-none">-</p>
          </div>
          <div className="px-4 py-1 bg-tetriary">
            <p className="select-none">{productData.quantity}</p>
          </div>

          <div
            onClick={handleAddQuantity}
            className="rounded-lg px-4 py-1 bg-tetriary hover:cursor-pointer"
          >
            <p className="select-none">+</p>
          </div>
        </div>

        <p>
          Price:{" "}
          <span className="text-primary font-semibold">
            {productData.price.toFixed(2).toString().replace(".", ",")} €{" "}
          </span>
        </p>
        <div
          className="hover:cursor-pointer"
          onClick={() => handleRemoveFromCart()}
        >
          <img src={TrashSVG} width={30} />
        </div>
      </div>
    </div>
  )
}

export default CartProduct
