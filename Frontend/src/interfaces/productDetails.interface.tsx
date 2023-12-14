export interface IProductDetails {
  id: string
  name: string
  description: string
  currentVariant: {
    id: string
    regularPrice: number
    discountPrice: number | null
    productKey: string
    name: string
    currentSize: string
    images: [
      {
        url: string
        dimensions: {
          w: number
          h: number
        }
      }
    ]
    availability: {
      isOnStock: boolean
      quantity: number
    }
  }
  otherSizes: [
    {
      id: number
      size: string
      key: string
      availability: {
        isOnStock: boolean
        quantity: number
      }
    }
  ]
  otherVariants: [
    {
      variantKey: string
      name: string
      images: [
        {
          url: string
          dimensions: {
            w: number
            h: number
          }
        }
      ]
    }
  ]
}
