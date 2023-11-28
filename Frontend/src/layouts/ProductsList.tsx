import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { IProduct } from "../interfaces/product.interface"
import ArrowLeftSVG from "../assets/arrow-left.svg"
import ArrowRightSVG from "../assets/arrow-right.svg"

const ProductsList = ({
  productsArray,
  itemsPerPage,
}: {
  productsArray: Array<IProduct>
  itemsPerPage?: number
}) => {
  const [paginatedProductsArray, setPaginatedProductsArray] = useState()
  const [pages, setPages] = useState()

  useEffect(() => {
    const p = productsArray.length / (itemsPerPage ?? 12)

    return () => {}
  }, [])

  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-full px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productsArray.map((item, index) => {
          return <ProductCard key={index} productData={item} />
        })}
      </div>
      {/* <div>
        <img src={ArrowLeftSVG} alt="" className="h-4" />
        <img src={ArrowRightSVG} alt="" className="h-4" />
      </div> */}
    </div>
  )
}

export default ProductsList
