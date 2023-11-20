import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../constants"
import Spinner from "../components/Spinner"
import { IDefaultPage } from "../types/defaultPage.type"
import CarouselLayout from "../layouts/Carousel"

const DefaultPage = () => {
  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [pageData, setPageData] = useState<IDefaultPage>()

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

  useEffect(() => {
    if (slug != "") getPageBySlug()
    return () => {}
  }, [slug])

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
      <div className="flex justify-center items-center w-full px-8 md:px-52 py-8">
        <div dangerouslySetInnerHTML={{ __html: pageData?.description }} />
      </div>
      {/* productsList */}
      <div className="bg-tetriary py-8 flex justify-center items-center">
        PRODUCTS LIST SOON...
      </div>
      <Footer footerData={pageData?.footer} />
    </div>
  )
}

export default DefaultPage
