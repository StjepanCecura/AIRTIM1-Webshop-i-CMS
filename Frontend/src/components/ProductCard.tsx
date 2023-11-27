import { IProduct } from "../interfaces/product.interface"

const ProductCard = ({ productData }: { productData: IProduct }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-white hover:bg-slate-200 hover:cursor-pointer hover:border-primary hover:border-2 border-2 border-white">
      <div className="">
        <img className="h-[300px]" src={productData.images[0].url} />
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
