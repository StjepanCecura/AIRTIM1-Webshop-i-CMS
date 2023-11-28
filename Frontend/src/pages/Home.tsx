import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../constants"
import Spinner from "../components/Spinner"
import CarouselLayout from "../layouts/Carousel"
import ProductsList from "../layouts/ProductsList"
import { IHomePage } from "../interfaces/homePage.interface"
import { IProduct } from "../interfaces/product.interface"

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [pageData, setPageData] = useState<IHomePage>()
  const [products1Title, setProducts1Title] = useState("")
  const [products1, setProducts1] = useState<Array<IProduct>>()
  const [products2Title, setProducts2Title] = useState("")
  const [products2, setProducts2] = useState<Array<IProduct>>()

  const getPageBySlug = async () => {
    setIsLoading(true)
    await axios
      .get(`${API_URL}/product/getHomePage`)
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

  const getProducts1ByCategoryId = async (categoryId: string) => {
    await axios
      .get(`${API_URL}/product/getProductsByCategory?categoryId=${categoryId}`)
      .then((res) => {
        setProducts1Title(res.data.categoryName)
        setProducts1(res.data.products)
      })
      .catch((err) => {
        console.log("ERROR PAGE -> ", err)
      })
  }

  const getProducts2ByCategoryId = async (categoryId: string) => {
    await axios
      .get(`${API_URL}/product/getProductsByCategory?categoryId=${categoryId}`)
      .then((res) => {
        setProducts2Title(res.data.categoryName)
        setProducts2(res.data.products)
      })
      .catch((err) => {
        console.log("ERROR PAGE -> ", err)
      })
  }

  useEffect(() => {
    getPageBySlug()
    return () => {}
  }, [])

  useEffect(() => {
    if ((pageData ?? "") != "") {
      if (pageData.category1) {
        getProducts1ByCategoryId(pageData.category1)
      }
      if (pageData.category2) {
        getProducts2ByCategoryId(pageData.category2)
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

      {products1 ? (
        <div className="bg-tetriary py-8 flex flex-col justify-center items-center gap-8">
          <div className="bg-black px-12 py-2 rounded-lg">
            <p className="text-[36px] font-semibold text-white">
              {products1Title}
            </p>
          </div>
          <ProductsList productsArray={products1} />
        </div>
      ) : null}

      {products2 ? (
        <div className="bg-tetriary py-8 flex flex-col justify-center items-center gap-8">
          <div className="bg-black px-12 py-2 rounded-lg min-w-[300px]">
            <p className="text-[36px] font-semibold text-white text-center">
              {products2Title}
            </p>
          </div>
          <ProductsList productsArray={products2} />
        </div>
      ) : null}

      <Footer footerData={pageData?.footer} />
    </div>
  )
}

export default Home
