import { useCallback, useEffect, useRef, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { closeCart, selectCartIsOpen } from '../store/cartSlice'
import {
  resetCheckout,
  selectCheckoutStep,
  type CheckoutStep,
} from '../store/checkoutSlice'
import { CartStep } from './checkout/CartStep'
import { CheckoutOverlay } from './checkout/CheckoutOverlay'
import {
  CheckoutSidebar,
  CheckoutSidebarInner,
} from './checkout/CheckoutSidebar'
import { ConfirmationStep } from './checkout/ConfirmationStep'
import { DeliveryStep } from './checkout/DeliveryStep'
import { PaymentStep } from './checkout/PaymentStep'

const STEP_LABELS: Record<CheckoutStep, string> = {
  cart: 'Carrinho',
  delivery: 'Entrega',
  payment: 'Pagamento',
  confirmation: 'Confirmação do pedido',
}

function renderStep(step: CheckoutStep) {
  switch (step) {
    case 'cart':
      return <CartStep />
    case 'delivery':
      return <DeliveryStep />
    case 'payment':
      return <PaymentStep />
    case 'confirmation':
      return <ConfirmationStep />
    default:
      return <CartStep />
  }
}

export function CartDrawer() {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(selectCartIsOpen)
  const step = useAppSelector(selectCheckoutStep)
  const panelRef = useRef<HTMLElement>(null)

  const handleClose = useCallback(() => {
    dispatch(resetCheckout())
    dispatch(closeCart())
  }, [dispatch])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, handleClose])

  useEffect(() => {
    if (!isOpen) return
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('button, input')?.focus()
    }, 0)
    return () => window.clearTimeout(t)
  }, [isOpen, step])

  if (!isOpen) return null

  const handleOverlayPointerDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return createPortal(
    <>
      <CheckoutOverlay
        role="presentation"
        aria-hidden={!isOpen}
        onMouseDown={handleOverlayPointerDown}
      />
      <CheckoutSidebar
        ref={panelRef}
        aria-modal="true"
        role="dialog"
        aria-label={STEP_LABELS[step]}
      >
        <CheckoutSidebarInner>{renderStep(step)}</CheckoutSidebarInner>
      </CheckoutSidebar>
    </>,
    document.body,
  )
}
