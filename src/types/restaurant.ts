export type RestaurantListItem = {
  id: number
  name: string
  rating: number
  description: string
  cardImage: string
  tags: string[]
}

export type MenuProduct = {
  id: number
  name: string
  description: string
  image: string
  price: number
  servingPortion: string
}
