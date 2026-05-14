import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { CartContext } from './cartContext'

export function CartProvider({ children }: { children: ReactNode }) {
  const [itemCount, setItemCount] = useState(0)

  const addItem = useCallback(() => {
    setItemCount((c) => c + 1)
  }, [])

  const value = useMemo(
    () => ({
      itemCount,
      addItem,
    }),
    [itemCount, addItem],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
