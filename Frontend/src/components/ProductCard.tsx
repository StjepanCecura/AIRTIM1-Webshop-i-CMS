import { IProduct } from "../interfaces/product.interface"
import { useNavigate } from "react-router-dom"

const ProductCard = ({ productData }: { productData: IProduct }) => {
  const navigate = useNavigate()
  const handleProductClick = () => {
    navigate(`/p/${productData.productKey}/${productData.variantKey}`)
  }
  return (
    <div
      onClick={handleProductClick}
      className="flex flex-col justify-center items-center bg-white hover:bg-slate-200 hover:cursor-pointer hover:border-primary hover:border-2 border-2 border-white"
    >
      <div className="h-[300px] flex justify-center items-center">
        <img src={productData.images[0].url} />
      </div>
      <div className="flex flex-col justify-center items-center pb-4">
        <p className="text-[18px]">{productData.name}</p>
        <div className="flex flex-row gap-4">
          {productData.discountPrice ? (
            <>
              <p className="text-black text-[18px] line-through">
                {productData.regularPrice
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}{" "}
                €
              </p>
              <p className="text-primary font-semibold text-[20px]">
                {productData.discountPrice
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}{" "}
                €
              </p>
            </>
          ) : (
            <p className="text-primary font-semibold text-[20px]">
              {productData.regularPrice.toFixed(2).toString().replace(".", ",")}{" "}
              €
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
