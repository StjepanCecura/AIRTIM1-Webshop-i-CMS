export interface ICustomer {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  country: {
    value: string
    label: string
  }
  city: string
  postalCode: string
  streetName: string
  streetNumber: string
}
