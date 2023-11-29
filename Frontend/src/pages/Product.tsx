import { useParams } from "react-router-dom"
import ProductCarousel from "../layouts/ProductCarousel"
import { IProduct } from "../interfaces/product.interface"
import { useEffect, useState } from "react"
import { IHomePage } from "../interfaces/homePage.interface"
import axios from "axios"
import { API_URL } from "../constants"
import Footer from "../layouts/Footer"
import Spinner from "../components/Spinner"
import Button from "../components/Button"
const Product = () => {
  const { productKey, variantKey } = useParams()
  const [pageData, setPageData] = useState<IHomePage>()
  const [loadingStack, setLoadingStack] = useState<number[]>([])

  const startLoading = () => {
    setLoadingStack((prev) => [...prev, 1])
  }

  const stopLoading = () => {
    setLoadingStack((prev) => prev.slice(0, -1))
  }

  const productData: IProduct = {
    name: "Nike AirForce 1",
    productKey: "123",
    variantKey: "123",
    regularPrice: 129.99,
    discountPrice: null,
    categories: [
      {
        typeId: "123",
        id: "123",
      },
    ],
    images: [
      {
        dimensions: {
          h: 100,
          w: 100,
        },
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d706b6dd-32a7-4ed9-81c9-c0808624807c/dunk-low-retro-shoes-JH36z5.png",
      },
    ],
  }

  const handleAddToCartClick = () => {}

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

  useEffect(() => {
    getPageBySlug()
    return () => {}
  }, [])

  if (loadingStack.length > 0) {
    return (
      <div className="flex justify-center items-center flex-1">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 px-8 py-8">
        <div style={{ flex: 6 }}>
          <ProductCarousel carouselProduct={productData} />
        </div>
        <div style={{ flex: 5 }}>
          <div className="flex flex-col gap-4">
            <p className="text-[36px]">{productData.name}</p>
            <p className="text-[32px] text-primary font-semibold">
              {productData.regularPrice.toFixed(2).toString().replace(".", ",")}{" "}
              €
            </p>
            <p className="max-w-sm">
              The radiance lives on in the Nike Air Force 1 '07, the basketball
              original that puts a fresh spin on what you know best: durably
              stitched overlays, clean finishes and the perfect amount of flash
              to make you shine.
            </p>
            <div className="max-w-sm">
              <Button text="Add to cart" onClick={handleAddToCartClick} />
            </div>
          </div>
        </div>
      </div>
      {pageData ? <Footer footerData={pageData?.footer} /> : null}
    </div>
  )
}

export default Product
