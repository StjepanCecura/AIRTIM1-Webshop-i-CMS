import { IHeader } from "./header.interface"
import { ICarousel } from "./carousel.interface"
import { IFooter } from "./footer.interface"
import { IProduct } from "./product.interface"

export interface IDefaultPage {
  title: string
  slug: string
  header: IHeader
  type: "none" | "category"
  products: [IProduct]
  carousel: ICarousel
  description: string
  footer: IFooter
}
