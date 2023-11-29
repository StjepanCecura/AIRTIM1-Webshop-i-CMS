import { IProduct } from "../interfaces/product.interface"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"

const ProductCarousel = ({
  carouselProduct,
}: {
  carouselProduct: IProduct
}) => {
  return (
    <div>
      <Carousel
        autoPlay
        interval={3000}
        transitionTime={500}
        emulateTouch
        swipeScrollTolerance={5}
        centerSlidePercentage={70}
      >
        {carouselProduct.images.map((image) => {
          return (
            <div key={image.url} className="max-h-[600px]">
              {/* <img src={`https:${image.url}`} /> */}
              <img
                className="max-h-[600px] object-contain"
                src={`${image.url}`}
              />
              {/* <p className="legend">{carouselProduct.name}</p> */}
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default ProductCarousel
