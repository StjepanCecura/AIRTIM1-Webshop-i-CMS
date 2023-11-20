import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../constants"
import Spinner from "../components/Spinner"

const DefaultPage = () => {
  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const getPageBySlug = async () => {
    setIsLoading(true)
    await axios
      .get(`${API_URL}/product/getPage?slug=${slug}`)
      .then((res) => {
        console.log("RES PAGE-> ", res)
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

  return (
    <div className="flex flex-col h-[calc(100vh-52px)]">
      <Header />
      <div className="flex flex-1 flex-col justify-center items-center">
        <p>Some content</p>
      </div>
      <Footer />
    </div>
  )
}

export default DefaultPage
