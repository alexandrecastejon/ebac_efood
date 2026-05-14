/** Resposta de https://api-ebac.vercel.app/api/efood/restaurantes */

export type ApiMenuItem = {
  id: number
  nome: string
  descricao: string
  foto: string
  preco: number
  porcao: string
}

export type ApiRestaurant = {
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  cardapio: ApiMenuItem[]
}
