import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import { IProductDetails } from "../interfaces/productDetails.interface"

const ProductCarousel = ({
  carouselProduct,
}: {
  carouselProduct: IProductDetails
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
        {carouselProduct?.currentVariant?.images.map((image) => {
          return (
            <div key={image?.url} className="max-h-[600px]">
              {/* <img src={`https:${image.url}`} /> */}
              <img
                className="max-h-[600px] object-contain"
                src={`${image?.url}`}
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
