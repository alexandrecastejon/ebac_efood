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
import lixeiraIcon from '../assets/icons/lixeira.png'
import { theme } from '../styles/theme'
import { formatBrl } from '../utils/format'

const DRAWER_Z = 1100

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
  width: min(${theme.sizes.cartSidebarWidth}, 100vw);
  height: 100vh;
  background-color: ${theme.colors.primary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.cartSidebarPaddingTop}
    ${theme.spacing.cartSidebarPaddingX} ${theme.spacing.sm};
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
`

const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  max-width: ${theme.sizes.cartContentWidth};
  margin: 0 auto;
  justify-content: flex-start;
`

/**
 * Scroll só na lista: com poucos itens a área encolhe e o rodapé fica junto aos cards;
 * com muitos itens atinge max-height e rola sem sobrepor os cards.
 */
const ProductsScroll = styled.div`
  flex: 0 1 auto;
  max-height: calc(
    100vh - ${theme.spacing.cartSidebarPaddingTop} - ${theme.spacing.sm} -
      ${theme.spacing.cartFooterMarginTop} -
      ${theme.sizes.cartTotalHeight} - ${theme.spacing.cartFooterGap} -
      ${theme.sizes.cartButtonHeight}
  );
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-gutter: stable;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.cartItemGap};
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 235, 217, 0.45);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 235, 217, 0.65);
  }
`

const EmptyMessage = styled.p`
  margin: ${theme.spacing.lg} 0 0;
  text-align: center;
  font-family: ${theme.font.family};
  font-size: ${theme.typography.cartTotal.fontSize};
  font-weight: ${theme.typography.cartTotal.fontWeight};
  color: ${theme.colors.peach};
  line-height: 1.4;
`

const ItemCard = styled.article`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: ${theme.sizes.cartItemHeight};
  box-sizing: border-box;
  background-color: ${theme.colors.peach};
  display: grid;
  grid-template-columns: ${theme.sizes.cartThumbSize} 1fr;
  column-gap: ${theme.spacing.cartImageTextGap};
  align-items: start;
  padding: 10px ${theme.spacing.sm} 10px ${theme.spacing.xs};
`

const Thumb = styled.img`
  width: ${theme.sizes.cartThumbSize};
  height: ${theme.sizes.cartThumbSize};
  object-fit: cover;
  display: block;
`

const ItemBody = styled.div`
  position: relative;
  min-width: 0;
  height: ${theme.sizes.cartThumbSize};
  padding-right: ${theme.sizes.cartTrashSize};
`

const ItemName = styled.h3`
  margin: 0;
  font-family: ${theme.font.family};
  font-size: ${theme.typography.cartItemTitle.fontSize};
  font-weight: ${theme.typography.cartItemTitle.fontWeight};
  line-height: ${theme.typography.cartItemTitle.lineHeight};
  color: ${theme.colors.primary};
`

const ItemPrice = styled.p`
  position: absolute;
  top: 63%;
  left: 0;
  margin: 0;
  transform: translateY(-50%);
  font-family: ${theme.font.family};
  font-size: ${theme.typography.cartItemPrice.fontSize};
  font-weight: ${theme.typography.cartItemPrice.fontWeight};
  line-height: ${theme.typography.cartItemPrice.lineHeight};
  color: ${theme.colors.primary};
`

const RemoveButton = styled.button`
  position: absolute;
  right: ${theme.spacing.xs};
  bottom: ${theme.spacing.xs};
  width: ${theme.sizes.cartTrashSize};
  height: ${theme.sizes.cartTrashSize};
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.85;
  }
`

const TrashIconImg = styled.img`
  width: ${theme.sizes.cartTrashSize};
  height: ${theme.sizes.cartTrashSize};
  object-fit: contain;
  display: block;
`

const CartFooter = styled.footer`
  flex-shrink: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.cartFooterGap};
  margin-top: ${theme.spacing.cartFooterMarginTop};
`

const TotalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: ${theme.sizes.cartTotalHeight};
  height: ${theme.sizes.cartTotalHeight};
  font-family: ${theme.font.family};
  font-size: ${theme.typography.cartTotal.fontSize};
  font-weight: ${theme.typography.cartTotal.fontWeight};
  line-height: ${theme.typography.cartTotal.lineHeight};
  color: ${theme.colors.peach};
`

const TotalLabel = styled.span`
  flex-shrink: 0;
`

const TotalValue = styled.span`
  flex-shrink: 0;
  text-align: right;
`

const ContinueButton = styled.button`
  width: 100%;
  height: ${theme.sizes.cartButtonHeight};
  min-height: ${theme.sizes.cartButtonHeight};
  padding: 0;
  box-sizing: border-box;
  border: none;
  border-radius: ${theme.radii.button};
  background-color: ${theme.colors.peach};
  color: ${theme.colors.primary};
  font-family: ${theme.font.family};
  font-size: ${theme.typography.cartButton.fontSize};
  font-weight: ${theme.typography.cartButton.fontWeight};
  line-height: ${theme.typography.cartButton.lineHeight};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &:hover {
    opacity: 0.95;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

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

  const hasItems = items.length > 0

  return createPortal(
    <>
      <Overlay
        role="presentation"
        aria-hidden={!isOpen}
        onMouseDown={handleOverlayPointerDown}
      />
      <Sidebar ref={panelRef} aria-modal="true" role="dialog" aria-label="Carrinho">
        <SidebarInner>
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
            <ContinueButton
              type="button"
              onClick={handleContinue}
              disabled={!hasItems}
            >
              Continuar com a entrega
            </ContinueButton>
          </CartFooter>
        </SidebarInner>
      </Sidebar>
    </>,
    document.body,
  )
}
