export interface IProduct {
  name: string
  productKey: string
  variantKey: string
  regularPrice: number
  discountPrice: number
  images: [
    {
      dimensions: {
        h: number
        w: number
      }
      url: string
    }
  ]
}
