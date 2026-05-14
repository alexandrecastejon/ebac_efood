import type { ApiMenuItem, ApiRestaurant } from '../types/restaurantApi'
import type { MenuProduct, RestaurantListItem } from '../types/restaurant'

export const RESTAURANTS_API_URL =
  'https://api-ebac.vercel.app/api/efood/restaurantes'

let restaurantsRequest: Promise<ApiRestaurant[]> | null = null

export async function fetchRestaurants(): Promise<ApiRestaurant[]> {
  if (!restaurantsRequest) {
    restaurantsRequest = (async () => {
      const res = await fetch(RESTAURANTS_API_URL)
      if (!res.ok) {
        restaurantsRequest = null
        throw new Error(`Falha ao carregar restaurantes (${res.status})`)
      }
      return (await res.json()) as ApiRestaurant[]
    })()
  }
  return restaurantsRequest
}

function capitalizeTipo(tipo: string): string {
  if (!tipo) return tipo
  return tipo.charAt(0).toUpperCase() + tipo.slice(1)
}

export function mapApiRestaurantToListItem(r: ApiRestaurant): RestaurantListItem {
  const tags: string[] = []
  if (r.destacado) tags.push('Destaque da semana')
  tags.push(capitalizeTipo(r.tipo))
  return {
    id: r.id,
    name: r.titulo,
    rating: r.avaliacao,
    description: r.descricao,
    cardImage: r.capa,
    tags,
  }
}

export function mapMenuItemToProduct(p: ApiMenuItem): MenuProduct {
  return {
    id: p.id,
    name: p.nome,
    description: p.descricao,
    image: p.foto,
    price: p.preco,
    servingPortion: p.porcao,
  }
}

export function findRestaurantByRouteId(
  list: ApiRestaurant[],
  id: string | undefined,
): ApiRestaurant | undefined {
  if (id === undefined || id === '') return undefined
  const n = Number(id)
  if (Number.isNaN(n)) return undefined
  return list.find((r) => r.id === n)
}
