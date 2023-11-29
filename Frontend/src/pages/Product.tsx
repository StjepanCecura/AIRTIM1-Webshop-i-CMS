import { useParams } from "react-router-dom"
const Product = () => {
  const { productKey, variantKey } = useParams()
  return (
    <div>
      Product {productKey} {variantKey}
    </div>
  )
}

export default Product
