import { useNavigate, useParams } from "react-router-dom"
import ProductCarousel from "../layouts/ProductCarousel"
import { IProduct } from "../interfaces/product.interface"
import { useEffect, useState } from "react"
import { IHomePage } from "../interfaces/homePage.interface"
import axios from "axios"
import { API_URL } from "../constants"
import Footer from "../layouts/Footer"
import Spinner from "../components/Spinner"
import Button from "../components/Button"
import { IProductDetails } from "../interfaces/productDetails.interface"
import { getShoppingCart, setShoppingCartId } from "../services/lsShoppingCart"
import { useContext } from "react"
import { CartContext } from "../services/CartContext"
import { getLoginStatus } from "../services/lsLoginStatus"

const Product = () => {
  const { productKey, variantKey } = useParams()
  const [pageData, setPageData] = useState<IHomePage>()
  const [loadingStack, setLoadingStack] = useState<number[]>([])
  const [productData, setProductData] = useState<IProductDetails>()
  const [currentSize, setCurrentSize] = useState("")
  const [productQuantity, setProductQuantity] = useState(1)
  const [currentVariantStock, setCurrentVariantStock] = useState<number>()

  const { setCardContextState } = useContext(CartContext)

  const navigate = useNavigate()

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const getPageBySlug = async () => {
    startLoading()
    await axios
      .get(`${API_URL}/product/getHomePage`)
      .then((res) => {
        setPageData(res.data)
      })
      .catch((err) => {
        console.log("ERROR PAGE -> ", err)
      })
      .finally(() => {
        stopLoading()
      })
  }

  const getProductVariant = async (
    _productKey: string,
    _variantKey: string
  ) => {
    startLoading()
    await axios
      .get(
        `${API_URL}/product/getProduct?productKey=${_productKey}&variant=${_variantKey}`
      )
      .then((res) => {
        setProductData(res.data)
        // console.log("RES -> ", res.data)
        setCurrentVariantStock(res.data.currentVariant.availability.quantity)
        setCurrentSize("")
        setProductQuantity(1)
        // setCurrentSize(res?.data?.currentVariant?.currentSize)
      })
      .catch((err) => {
        console.log("ERROR PAGE -> ", err)
      })
      .finally(() => {
        stopLoading()
      })
  }

  const handleReduceQuantity = () => {
    if (currentSize != "") {
      setProductQuantity((prev) => {
        if (prev > 1) return --prev
        return prev // If prev is already 0, return the unchanged value
      })
    }
  }

  const handleAddQuantity = () => {
    if (currentSize != "") {
      setProductQuantity((prev) => {
        if (prev < currentVariantStock) return ++prev
        return prev // If prev is already max, return the unchanged value
      })
    }
  }

  const getProductDetails = () => {
    let productId = productData?.id
    let quantity = productQuantity
    let variantId
    if (productData.currentVariant.currentSize == currentSize) {
      variantId = productData.currentVariant.id
    } else {
      const variantFound = productData?.otherSizes?.find(
        (otherSize) => otherSize.size == currentSize
      )
      if (variantFound) {
        variantId = variantFound.id
      }
    }
    return { productId, variantId, quantity }
  }

  const createShoppingCart = async () => {
    startLoading()
    const cartId = await axios
      .post(`${API_URL}/product/createCart`)
      .then((res) => {
        if (res?.status == 200) {
          return res?.data?.cartId ?? ""
        }
        if (res?.data?.error) {
          console.log("createShoppingCart ERROR 1 -> ", res?.data?.error)
        }
      })
      .catch((err) => {
        console.log("createShoppingCart ERROR 2 -> ", err)
      })
      .finally(() => {
        stopLoading()
      })
    return cartId
  }

  const handleAddToCartClick = async () => {
    const { productId, variantId, quantity } = getProductDetails()

    const loginStatus = getLoginStatus()
    if (loginStatus == null) {
      // User is not logged in
      const cartIdFromLS = getShoppingCart()
      if (cartIdFromLS == null || cartIdFromLS == "") {
        // Create new cart and store it into LS
        const cartIdFromCommercetools = await createShoppingCart()
        setShoppingCartId(cartIdFromCommercetools)
        //TODO: update cart by cart id (add productId, variantId and quntity)
      } else {
        //TODO: update cart by cartIdFromLS (add productId, variantId and quntity)
      }
    }
    if (loginStatus == "true") {
      //TODO: update cart by user (add productId, variantId and quntity)
    }
    setCardContextState(true)

    // alert(
    //   "ID -> " +
    //     productId +
    //     ", Variant ID -> " +
    //     variantId +
    //     ", Quantity -> " +
    //     quantity
    // )
  }

  const handleVariantSizeClick = (_variantSize: string) => {
    setCurrentSize(_variantSize)
  }

  const handleVariantClick = async (_variantKey: string) => {
    navigate(`/p/${productKey}/${_variantKey}`)
  }

  useEffect(() => {
    getPageBySlug()
    return () => {}
  }, [])

  useEffect(() => {
    getProductVariant(productKey, variantKey)
    return () => {}
  }, [])

  useEffect(() => {
    getProductVariant(productKey, variantKey)
    return () => {}
  }, [variantKey])

  useEffect(() => {
    let tempStock = 0
    if (productData?.currentVariant?.currentSize == currentSize) {
      tempStock = productData?.currentVariant?.availability?.quantity
    } else {
      const variantFound = productData?.otherSizes?.find(
        (otherSize) => otherSize.size == currentSize
      )
      if (variantFound) {
        tempStock = variantFound.availability.quantity
      }
    }

    setCurrentVariantStock(tempStock)

    return () => {}
  }, [currentSize])

  if (loadingStack.length > 0) {
    return (
      <div className="flex justify-center items-center flex-1">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 px-8 py-8 mb-8">
        <div style={{ flex: 6 }}>
          <ProductCarousel carouselProduct={productData} />
        </div>
        <div style={{ flex: 5 }}>
          <div className="flex flex-col gap-4">
            <p className="text-[36px]">{productData?.name}</p>
            <div className="flex flex-row gap-4 items-center">
              {productData?.currentVariant?.discountPrice ? (
                <>
                  <p className="text-black text-[26px] line-through">
                    {productData?.currentVariant?.regularPrice
                      .toFixed(2)
                      .toString()
                      .replace(".", ",")}{" "}
                    €
                  </p>
                  <p className="text-primary font-semibold text-[32px]">
                    {productData?.currentVariant?.discountPrice
                      .toFixed(2)
                      .toString()
                      .replace(".", ",")}{" "}
                    €
                  </p>
                </>
              ) : (
                <p className="text-primary font-semibold text-[32px]">
                  {productData?.currentVariant?.regularPrice
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")}{" "}
                  €
                </p>
              )}
            </div>
            <div className="flex flex-row gap-2">
              <div
                className={`p-3 bg-tetriary ${
                  productData?.currentVariant?.currentSize == currentSize
                    ? "border-primary"
                    : "border-tetriary"
                } border-2 ${
                  productData?.currentVariant?.availability?.isOnStock
                    ? "hover:cursor-pointer"
                    : ""
                }`}
                onClick={() => {
                  if (productData?.currentVariant?.availability?.isOnStock)
                    handleVariantSizeClick(
                      productData?.currentVariant?.currentSize
                    )
                }}
              >
                <p
                  className={`${
                    productData?.currentVariant?.availability?.isOnStock
                      ? ""
                      : "text-slate-400"
                  }`}
                >
                  {productData?.currentVariant?.currentSize}
                </p>
              </div>
              {productData?.otherSizes.map((size, index) => {
                return (
                  <div
                    key={index}
                    className={`p-3 bg-tetriary ${
                      size?.size == currentSize
                        ? "border-primary"
                        : "border-tetriary"
                    } border-2 ${
                      size.availability.isOnStock ? "hover:cursor-pointer" : ""
                    }`}
                    onClick={() => {
                      if (size.availability.isOnStock == true)
                        handleVariantSizeClick(size.size)
                    }}
                  >
                    <p
                      className={`${
                        size.availability.isOnStock ? "" : "text-slate-400 "
                      }`}
                    >
                      {size.size}
                    </p>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-row gap-2">
              {productData?.otherVariants.map((variant, index) => {
                return (
                  <div
                    key={index}
                    className="w-[100px] h-[100px] bg-tetriary hover:cursor-pointer flex justify-center items-center"
                    onClick={() => handleVariantClick(variant.variantKey)}
                  >
                    <img src={`${variant.images[0].url}`} />
                  </div>
                )
              })}
            </div>
            {currentSize != "" ? (
              <div className="flex gap-2">
                <p>Available quantity:</p>
                <p>{currentVariantStock}</p>
              </div>
            ) : null}

            <div className="flex items-center gap-2">
              <div
                onClick={handleReduceQuantity}
                className={`rounded-lg px-4 py-1 bg-tetriary ${
                  currentSize != "" ? "hover:cursor-pointer" : ""
                }`}
              >
                <p
                  className={`${
                    currentSize != "" ? "" : "text-slate-400"
                  } select-none`}
                >
                  -
                </p>
              </div>
              <div className="px-4 py-1 bg-tetriary">
                <p
                  className={`${
                    currentSize != "" ? "" : "text-slate-400"
                  } select-none`}
                >
                  {productQuantity}
                </p>
              </div>

              <div
                onClick={handleAddQuantity}
                className={`rounded-lg px-4 py-1 bg-tetriary ${
                  currentSize != "" ? "hover:cursor-pointer" : ""
                }`}
              >
                <p
                  className={`${
                    currentSize != "" ? "" : "text-slate-400"
                  } select-none`}
                >
                  +
                </p>
              </div>
            </div>
            <p className="max-w-sm">{productData?.description}</p>
            <div className="max-w-sm">
              <Button
                disabled={currentSize == ""}
                text="Add to cart"
                onClick={handleAddToCartClick}
              />
            </div>
          </div>
        </div>
      </div>
      {pageData ? <Footer footerData={pageData?.footer} /> : null}
    </div>
  )
}

export default Product
