import { IHeader } from "./header.type"
import { ICarousel } from "./carousel.type"
import { IFooter } from "./footer.type"

export interface IDefaultPage {
  title: string
  slug: string
  header: IHeader
  type: "tag" | "category"
  tag: string | "none"
  category: string
  carousel: ICarousel
  description: string
  footer: IFooter
}
