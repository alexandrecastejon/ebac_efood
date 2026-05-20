import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  removeItem,
  selectCartItems,
  selectCartTotal,
} from '../../store/cartSlice'
import { setStep } from '../../store/checkoutSlice'
import lixeiraIcon from '../../assets/icons/lixeira.png'
import { formatBrl } from '../../utils/format'
import {
  CartFooter,
  EmptyMessage,
  ItemBody,
  ItemCard,
  ItemName,
  ItemPrice,
  ProductsScroll,
  RemoveButton,
  Thumb,
  TotalLabel,
  TotalRow,
  TotalValue,
  TrashIconImg,
} from './cartStepStyles'
import { CheckoutButton } from './checkoutStyles'

export function CartStep() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const hasItems = items.length > 0

  return (
    <>
      <ProductsScroll>
        {!hasItems ? (
          <EmptyMessage>Seu carrinho está vazio</EmptyMessage>
        ) : (
          items.map((item) => (
            <ItemCard key={item.lineId}>
              <Thumb src={item.image} alt="" />
              <ItemBody>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>{formatBrl(item.price)}</ItemPrice>
              </ItemBody>
              <RemoveButton
                type="button"
                aria-label={`Remover ${item.name} do carrinho`}
                onClick={() => dispatch(removeItem(item.lineId))}
              >
                <TrashIconImg src={lixeiraIcon} alt="" />
              </RemoveButton>
            </ItemCard>
          ))
        )}
      </ProductsScroll>
      <CartFooter>
        <TotalRow>
          <TotalLabel>Valor total</TotalLabel>
          <TotalValue>{formatBrl(total)}</TotalValue>
        </TotalRow>
        <CheckoutButton
          type="button"
          onClick={() => dispatch(setStep('delivery'))}
          disabled={!hasItems}
        >
          Continuar com a entrega
        </CheckoutButton>
      </CartFooter>
    </>
  )
}
