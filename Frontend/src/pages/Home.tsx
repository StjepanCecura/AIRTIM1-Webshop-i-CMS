import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../constants"
import Spinner from "../components/Spinner"
import { IDefaultPage } from "../interfaces/defaultPage.interface"
import CarouselLayout from "../layouts/Carousel"
import ProductsList from "../layouts/ProductsList"

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [pageData, setPageData] = useState<IDefaultPage>()

  const getPageBySlug = async () => {
    setIsLoading(true)
    await axios
      .get(`${API_URL}/product/getPage?slug=home`)
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

      {/* newReleases */}
      <div className="bg-tetriary py-8 flex justify-center items-center">
        <ProductsList />
      </div>
      {/* Popular */}
      <div className="bg-white py-8 flex justify-center items-center">
        <ProductsList />
      </div>
      <Footer footerData={pageData?.footer} />
    </div>
  )
}

export default Home
