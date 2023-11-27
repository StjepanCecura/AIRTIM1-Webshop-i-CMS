import ProductCard from "../components/ProductCard"

const ProductsList = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div className="w-full h-full px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {arr.map((item, index) => {
        return <ProductCard key={index} id={item} />
      })}
    </div>
  )
}

export default ProductsList
