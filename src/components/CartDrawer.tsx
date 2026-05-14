import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  closeCart,
  removeItem,
  selectCartIsOpen,
  selectCartItems,
  selectCartTotal,
} from '../store/cartSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { theme } from '../styles/theme'
import { formatBrl } from '../utils/format'

const DRAWER_Z = 1100
const SIDEBAR_WIDTH = '360px'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${DRAWER_Z};
  background-color: ${theme.colors.overlayModal};
  box-sizing: border-box;
`

const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${DRAWER_Z + 1};
  width: min(${SIDEBAR_WIDTH}, 100vw);
  height: 100vh;
  background-color: ${theme.colors.primary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.md};
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
`

/** Lista + total + botão no mesmo fluxo (como no Figma), com scroll só quando necessário. */
const CartBody = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: ${theme.spacing.sm};
`

const EmptyMessage = styled.p`
  margin: ${theme.spacing.lg} ${theme.spacing.sm} 0;
  text-align: center;
  font-family: ${theme.font.family};
  font-size: 14px;
  font-weight: 700;
  color: ${theme.colors.peach};
  line-height: 1.4;
`

const ItemCard = styled.article`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: ${theme.spacing.sm};
  min-height: 100px;
  padding: ${theme.spacing.xs};
  box-sizing: border-box;
  background-color: ${theme.colors.peach};
`

const Thumb = styled.img`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  object-fit: cover;
  align-self: center;
`

const ItemBody = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding-right: 28px;
  padding-bottom: 4px;
`

const ItemName = styled.h3`
  margin: 0 0 4px;
  font-family: ${theme.font.family};
  font-size: 18px;
  font-weight: 900;
  line-height: 1.2;
  color: ${theme.colors.primary};
`

const ItemPrice = styled.p`
  margin: 0;
  font-family: ${theme.font.family};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${theme.colors.primary};
`

const RemoveButton = styled.button`
  position: absolute;
  right: ${theme.spacing.xs};
  bottom: ${theme.spacing.xs};
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.85;
  }
`

const TotalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  font-family: ${theme.font.family};
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  color: ${theme.colors.peach};
`

const ContinueButton = styled.button`
  flex-shrink: 0;
  width: 100%;
  min-height: 40px;
  padding: ${theme.spacing.sm};
  box-sizing: border-box;
  border: none;
  border-radius: ${theme.radii.button};
  background-color: ${theme.colors.peach};
  color: ${theme.colors.primary};
  font-family: ${theme.font.family};
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <path
        fill="currentColor"
        d="M5.5 5.5v6h1v-6h-1zm4 0v6h1v-6h-1zM2 4v1h12V4H2zm2-2V1h8v1H4zm-1 2h10l-1 9H5L3 4z"
      />
    </svg>
  )
}

export function CartDrawer() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isOpen = useAppSelector(selectCartIsOpen)
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const panelRef = useRef<HTMLElement>(null)

  const handleClose = useCallback(() => {
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
        dispatch(closeCart())
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, dispatch])

  useEffect(() => {
    if (!isOpen) return
    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('button')?.focus()
    }, 0)
    return () => window.clearTimeout(t)
  }, [isOpen])

  if (!isOpen) return null

  const handleOverlayPointerDown = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose()
  }

  const handleContinue = () => {
    dispatch(closeCart())
    navigate('/entrega')
  }

  return createPortal(
    <>
      <Overlay
        role="presentation"
        aria-hidden={!isOpen}
        onMouseDown={handleOverlayPointerDown}
      />
      <Sidebar ref={panelRef} aria-modal="true" role="dialog" aria-label="Carrinho">
        <CartBody>
          {items.length === 0 ? (
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
                  <TrashIcon />
                </RemoveButton>
              </ItemCard>
            ))
          )}
          <TotalRow>
            <span>Valor total</span>
            <span>{formatBrl(total)}</span>
          </TotalRow>
          <ContinueButton
            type="button"
            onClick={handleContinue}
            disabled={items.length === 0}
          >
            Continuar com a entrega
          </ContinueButton>
        </CartBody>
      </Sidebar>
    </>,
    document.body,
  )
}
