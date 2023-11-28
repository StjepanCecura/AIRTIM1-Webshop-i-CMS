import { IHeader } from "./header.interface"
import { ICarousel } from "./carousel.interface"
import { IFooter } from "./footer.interface"
import { IProduct } from "./product.interface"

export interface IHomePage {
  title: string
  slug: string
  header: IHeader
  products1Title: string
  products1: [IProduct]
  products2Title: string
  products2: [IProduct]
  carousel: ICarousel
  description: string
  footer: IFooter
}
