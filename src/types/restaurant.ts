/** Modelo de card na home (mapeado a partir da API). */
export type RestaurantListItem = {
  id: number
  name: string
  rating: number
  description: string
  cardImage: string
  tags: string[]
}

/** Produto do cardápio na UI (perfil + modal). */
export type MenuProduct = {
  id: number
  name: string
  description: string
  image: string
  price: number
  servingPortion: string
}
