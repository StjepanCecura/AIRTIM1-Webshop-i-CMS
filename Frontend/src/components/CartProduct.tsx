import { useEffect, useState } from "react"
import { ICartProduct } from "../interfaces/cartProduct.interface"
import TrashSVG from "../assets/trash.svg"
import axios from "axios"
import { API_URL } from "../constants"
import { toast } from "react-toastify"
import Spinner from "./Spinner"

const CartProduct = ({
  productData,
  loginStatus,
  cartId,
  setCartTotal,
  cartTotal,
}: {
  productData: ICartProduct
  loginStatus: boolean
  cartId: string
  setCartTotal: React.Dispatch<React.SetStateAction<number>>
  cartTotal: number
}) => {
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  const [loadingStack, setLoadingStack] = useState<number[]>([])

  const modifyData = () => {
    const data = productData.variantKey.split("-")
    setSize(data[data.length - 1])
    setColor(data[data.length - 3])
  }

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const getCartVersionByCartId = async (cartId: string) => {
    startLoading()
    let version: number | null
    await axios
      .get(`${API_URL}/product/getCartById?cartId=${cartId}`)
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
      .finally(() => {
        stopLoading()
      })
    return version
  }

  const addToCartByCartId = async (
    cartId: string,
    cartVersion: number,
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    startLoading()
    await axios
      .post(`${API_URL}/product/addProductToCart`, {
        cartId: cartId,
        version: cartVersion,
        productId: productId,
        variantId: variantId,
        quantity: quantity,
      })
      .then((res) => {
        if (res?.status == 200) {
          console.log("RES 3 -> ", res)
        }
        if (res?.data?.error) {
          console.log("addToCartByCartId ERROR 1 -> ", res?.data?.error)
          toast.error("Error while adding to cart. Please try again later.")
        }
      })
      .catch((err) => {
        console.log("addToCartByCartId ERROR 2 -> ", err)
      })
      .finally(() => {
        productData.quantity += 1
        setCartTotal(cartTotal + productData.price)
        stopLoading()
      })
  }

  const handleReduceQuantity = () => {}

  const handleAddQuantity = async () => {
    const cartVersion = await getCartVersionByCartId(cartId)
    if (cartVersion != null) {
      addToCartByCartId(
        cartId,
        cartVersion,
        productData.productId,
        productData.variantKey,
        1 // add one product
      )
    } else {
      toast.error("Error while adding to cart. Please try again later.")
    }
  }

  const handleRemoveFromCart = async () => {}

  useEffect(() => {
    modifyData()

    return () => {}
  }, [])

  return (
    <div className="flex flex-row gap-8 px-12">
      <div className="flex justify-center items-center shadow-lg">
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
            {loadingStack.length > 0 ? (
              <Spinner width={22} />
            ) : (
              <p className="select-none">{productData.quantity}</p>
            )}
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
