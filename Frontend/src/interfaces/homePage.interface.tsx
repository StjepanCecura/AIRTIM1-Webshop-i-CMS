import { IHeader } from "./header.interface"
import { ICarousel } from "./carousel.interface"
import { IFooter } from "./footer.interface"
import { IProduct } from "./product.interface"

export interface IHomePage {
  title: string
  slug: string
  header: IHeader
  category1: string
  category2: string
  carousel: ICarousel
  description: string
  footer: IFooter
}
