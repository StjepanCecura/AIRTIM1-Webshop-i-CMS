import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../constants"
import Spinner from "../components/Spinner"
import CarouselLayout from "../layouts/Carousel"
import ProductsList from "../layouts/ProductsList"
import { IHomePage } from "../interfaces/homePage.interface"

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [pageData, setPageData] = useState<IHomePage>()

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

  useEffect(() => {
    getPageBySlug()
    return () => {}
  }, [])

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

      {pageData?.products1 ? (
        <div className="bg-tetriary py-8 flex flex-col justify-center items-center gap-8">
          <p className="text-[36px] font-semibold">
            {pageData?.products1Title}
          </p>
          <ProductsList productsArray={pageData?.products1} />
        </div>
      ) : null}

      {pageData?.products2 ? (
        <div className="bg-tetriary py-8 flex flex-col justify-center items-center gap-8">
          <p className="text-[36px] font-semibold">
            {pageData?.products2Title}
          </p>
          <ProductsList productsArray={pageData?.products2} />
        </div>
      ) : null}

      <Footer footerData={pageData?.footer} />
    </div>
  )
}

export default Home
