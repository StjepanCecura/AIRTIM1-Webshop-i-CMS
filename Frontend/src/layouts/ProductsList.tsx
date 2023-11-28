import { useState } from "react"
import ProductCard from "../components/ProductCard"
import { IProduct } from "../interfaces/product.interface"

const ProductsList = ({
  productsArray,
}: {
  productsArray: Array<IProduct>
}) => {
  const [paginatedProductsArray, setPaginatedProductsArray] = useState()

  // useEffect(() => {

  //   return () => {

  //   }
  // }, [])

  return (
    <div className="w-full h-full px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {productsArray.map((item, index) => {
        return <ProductCard key={index} productData={item} />
      })}
    </div>
  )
}

export default ProductsList
