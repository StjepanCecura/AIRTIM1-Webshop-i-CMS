export interface IProduct {
  name: string
  productKey: string
  variantKey: string
  regularPrice: number
  discountPrice: number
  categories: [
    {
      typeId: string
      id: string
    }
  ]
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
