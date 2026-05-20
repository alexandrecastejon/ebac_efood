import type { CheckoutPayload, CheckoutResponse } from '../types/checkout'

export const CHECKOUT_API_URL =
  'https://api-ebac.vercel.app/api/efood/checkout'

export async function submitCheckout(
  payload: CheckoutPayload,
): Promise<CheckoutResponse> {
  const res = await fetch(CHECKOUT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    let message = `Falha ao finalizar pedido (${res.status})`
    const data = (await res.json().catch(() => null)) as {
      message?: string
    } | null
    if (data?.message) message = data.message
    throw new Error(message)
  }

  const data = (await res.json()) as CheckoutResponse
  if (!data.orderId) {
    throw new Error('Resposta inválida da API de checkout.')
  }
  return data
}
