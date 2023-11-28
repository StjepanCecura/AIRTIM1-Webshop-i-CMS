import { useParams } from "react-router-dom"
const Product = () => {
  const { productKey, variantKey } = useParams()
  return <div>Product</div>
}

export default Product
