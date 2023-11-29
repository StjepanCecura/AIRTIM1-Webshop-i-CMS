import { useParams } from "react-router-dom"
import CarouselLayout from "../layouts/Carousel"
import { ICarousel } from "../interfaces/carousel.interface"
const Product = () => {
  const bok: ICarousel = {
    images: [
      {
        title: "Image 1",
        description: "Image 1 Desc",
        url: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d706b6dd-32a7-4ed9-81c9-c0808624807c/dunk-low-retro-shoes-JH36z5.png",
      },
    ],
  }

  const { productKey, variantKey } = useParams()
  return (
    <div className="flex flex-row gap-8 px-8 py-8">
      <div style={{ flex: 6 }}>
        <CarouselLayout carouselData={bok} />
      </div>
      <div style={{ flex: 5 }}>
        Product {productKey} {variantKey}
      </div>
    </div>
  )
}

export default Product
