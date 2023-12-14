import { ICarousel } from "../interfaces/carousel.interface"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"

const CarouselLayout = ({ carouselData }: { carouselData: ICarousel }) => {
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
        {carouselData.images.map((image) => {
          return (
            <div key={image.url} className="max-h-[600px]">
              <img
                className="max-h-[600px] object-contain"
                src={`https:${image.url}`}
              />
              {/* <img
                className="max-h-[600px] object-contain"
                src={`${image.url}`}
              /> */}
              <p className="legend">{image.title}</p>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default CarouselLayout

// className="flex justify-center items-center w-full py-8 md:px-80 md:py-8 bg-tetriary"
