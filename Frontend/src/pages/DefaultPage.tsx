import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../constants"
import Spinner from "../components/Spinner"
import { IDefaultPage } from "../interfaces/defaultPage.interface"
import CarouselLayout from "../layouts/Carousel"
import ProductsList from "../layouts/ProductsList"
import { IProduct } from "../interfaces/product.interface"

const DefaultPage = () => {
  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isProductsLoading, setIsProductsLoading] = useState(false)
  const [pageData, setPageData] = useState<IDefaultPage>()
  const [products, setProducts] = useState<Array<IProduct>>()

  const getPageBySlug = async () => {
    setIsLoading(true)
    await axios
      .get(`${API_URL}/product/getPage?slug=${slug}`)
      .then((res) => {
        setPageData(res.data)
      })
      .catch((err) => {
        console.log("ERROR PAGE -> ", err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const getProductsByCategoryId = async (categoryId: string) => {
    setIsProductsLoading(true)
    await axios
      .get(`${API_URL}/product/getProductsByCategory?categoryId=${categoryId}`)
      .then((res) => {
        setProducts(res.data.products)
      })
      .catch((err) => {
        console.log("ERROR PAGE -> ", err)
      })
      .finally(() => {
        setIsProductsLoading(false)
      })
  }

  useEffect(() => {
    if (slug != "") getPageBySlug()
    return () => {}
  }, [slug])

  useEffect(() => {
    if ((pageData ?? "") != "") {
      if (pageData.category) {
        getProductsByCategoryId(pageData.category)
      }
    }

    return () => {}
  }, [pageData])

  if (isLoading)
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner />
      </div>
    )

  if ((pageData ?? "") == "")
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner />
      </div>
    )

  return (
    <div className="flex flex-col h-[calc(100vh-52px)]">
      <Header headerData={pageData?.header} />
      {pageData?.carousel ? (
        <CarouselLayout carouselData={pageData?.carousel} />
      ) : null}
      {pageData?.description ? (
        <div className="flex justify-center items-center w-full px-8 md:px-52 py-8">
          <div dangerouslySetInnerHTML={{ __html: pageData?.description }} />
        </div>
      ) : null}

      {isProductsLoading ? (
        <div className="flex-col justify-center items-center py-[200px]">
          <Spinner />
        </div>
      ) : (
        <>
          {products ? (
            <div className="bg-tetriary py-8 flex justify-center items-center">
              <ProductsList productsArray={products} />
            </div>
          ) : null}
        </>
      )}
      {/* productsList */}

      <Footer footerData={pageData?.footer} />
    </div>
  )
}

export default DefaultPage
