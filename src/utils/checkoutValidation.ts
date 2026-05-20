import type { DeliveryFormState, PaymentFormState } from '../store/checkoutSlice'

export function parseExpiryYear(value: string): number | null {
  const trimmed = value.trim()
  if (!/^\d{2,4}$/.test(trimmed)) return null
  const n = Number.parseInt(trimmed, 10)
  if (!Number.isFinite(n)) return null
  if (trimmed.length === 2) return 2000 + n
  return n
}

export function isDeliveryFormValid(delivery: DeliveryFormState): boolean {
  return (
    delivery.receiver.trim() !== '' &&
    delivery.description.trim() !== '' &&
    delivery.city.trim() !== '' &&
    delivery.zipCode.trim() !== '' &&
    delivery.number.trim() !== '' &&
    Number.isFinite(Number.parseInt(delivery.number.trim(), 10))
  )
}

export function isPaymentFormValid(payment: PaymentFormState): boolean {
  const cardDigits = payment.cardNumber.replace(/\D/g, '')
  const month = Number.parseInt(payment.expiresMonth.trim(), 10)
  const year = parseExpiryYear(payment.expiresYear)
  const cvv = Number.parseInt(payment.cvv.trim(), 10)

  return (
    payment.cardName.trim() !== '' &&
    cardDigits.length >= 4 &&
    payment.cvv.trim() !== '' &&
    Number.isFinite(cvv) &&
    payment.expiresMonth.trim() !== '' &&
    Number.isFinite(month) &&
    month >= 1 &&
    month <= 12 &&
    year !== null
  )
}
