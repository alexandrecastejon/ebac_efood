export type CheckoutProduct = {
  id: number
  price: number
}

export type CheckoutPayload = {
  products: CheckoutProduct[]
  delivery: {
    receiver: string
    address: {
      description: string
      city: string
      zipCode: string
      number: number
      complement?: string
    }
  }
  payment: {
    card: {
      name: string
      number: string
      code: number
      expires: {
        month: number
        year: number
      }
    }
  }
}

export type CheckoutResponse = {
  orderId: string
}
