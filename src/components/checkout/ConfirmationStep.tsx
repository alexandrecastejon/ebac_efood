import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { clearCart, closeCart } from '../../store/cartSlice'
import { resetCheckout, selectOrderId } from '../../store/checkoutSlice'
import {
  CheckoutActions,
  CheckoutButton,
  CheckoutContent,
  CheckoutScroll,
  CheckoutTitle,
  ConfirmationText,
} from './checkoutStyles'

const CONFIRMATION_BODY = [
  'Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.',
  'Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras.',
  'Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar durante a refeição.',
  'Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom apetite!',
].join('\n\n')

export function ConfirmationStep() {
  const dispatch = useAppDispatch()
  const orderId = useAppSelector(selectOrderId)

  const handleFinish = () => {
    dispatch(clearCart())
    dispatch(resetCheckout())
    dispatch(closeCart())
  }

  return (
    <CheckoutScroll>
      <CheckoutContent>
        <CheckoutTitle>
          Pedido realizado{orderId ? ` - ${orderId}` : ''}
        </CheckoutTitle>
        <ConfirmationText>{CONFIRMATION_BODY}</ConfirmationText>
        <CheckoutActions>
          <CheckoutButton type="button" onClick={handleFinish}>
            Concluir
          </CheckoutButton>
        </CheckoutActions>
      </CheckoutContent>
    </CheckoutScroll>
  )
}
