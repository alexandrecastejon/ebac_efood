import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { MenuProduct } from '../types/restaurant'

export type CartLineItem = {
  lineId: string
  productId: number
  name: string
  image: string
  price: number
}

export type CartState = {
  items: CartLineItem[]
  isOpen: boolean
}

const initialState: CartState = {
  items: [],
  isOpen: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: {
      reducer(state, action: PayloadAction<CartLineItem>) {
        state.items.push(action.payload)
      },
      prepare(product: MenuProduct) {
        return {
          payload: {
            lineId: crypto.randomUUID(),
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
          } satisfies CartLineItem,
        }
      },
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.lineId !== action.payload)
    },
    openCart(state) {
      state.isOpen = true
    },
    closeCart(state) {
      state.isOpen = false
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addItem, removeItem, openCart, closeCart, clearCart } =
  cartSlice.actions

export default cartSlice.reducer

type CartRoot = { cart: CartState }

export const selectCartItems = (state: CartRoot) => state.cart.items

export const selectCartItemCount = (state: CartRoot) => state.cart.items.length

export const selectCartTotal = (state: CartRoot) =>
  state.cart.items.reduce((sum, item) => sum + item.price, 0)

export const selectCartIsOpen = (state: CartRoot) => state.cart.isOpen
