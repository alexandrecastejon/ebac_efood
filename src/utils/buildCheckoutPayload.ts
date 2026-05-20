import type { RootState } from '../store/store'
import type { CheckoutPayload } from '../types/checkout'
import { parseExpiryYear } from './checkoutValidation'

function parsePositiveInt(value: string): number | null {
  const n = Number.parseInt(value.trim(), 10)
  if (!Number.isFinite(n) || n < 0) return null
  return n
}

export function buildCheckoutPayload(state: RootState): CheckoutPayload {
  const { cart, checkout } = state
  const number = parsePositiveInt(checkout.delivery.number)
  const code = parsePositiveInt(checkout.payment.cvv)
  const month = parsePositiveInt(checkout.payment.expiresMonth)
  const year = parseExpiryYear(checkout.payment.expiresYear)

  if (number === null || code === null || month === null || year === null) {
    throw new Error('Dados de pagamento ou endereço inválidos.')
  }

  const complement = checkout.delivery.complement.trim()

  return {
    products: cart.items.map((item) => ({
      id: item.productId,
      price: item.price,
    })),
    delivery: {
      receiver: checkout.delivery.receiver.trim(),
      address: {
        description: checkout.delivery.description.trim(),
        city: checkout.delivery.city.trim(),
        zipCode: checkout.delivery.zipCode.trim(),
        number,
        ...(complement ? { complement } : {}),
      },
    },
    payment: {
      card: {
        name: checkout.payment.cardName.trim(),
        number: checkout.payment.cardNumber.replace(/\s/g, ''),
        code,
        expires: { month, year },
      },
    },
  }
}
