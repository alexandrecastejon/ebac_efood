import { createContext } from 'react'

export type CartContextValue = {
  itemCount: number
  addItem: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
