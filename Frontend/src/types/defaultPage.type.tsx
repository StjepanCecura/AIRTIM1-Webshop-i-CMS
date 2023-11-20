import { Header } from "./header.type"
import { Carousel } from "./carousel.type"
import { Footer } from "./footer.type"

export interface DefaultPage {
  title: string
  slug: string
  header: Header
  type: "tag" | "category"
  tag: string | "none"
  carousel: Carousel
  description: string
  footer: Footer
}
