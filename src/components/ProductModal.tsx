import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type MouseEvent,
  type KeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { MenuProduct } from '../types/restaurant'
import { formatBrl } from '../utils/format'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.overlayModal};
  box-sizing: border-box;
`

const Panel = styled.div`
  position: relative;
  width: 100%;
  max-width: ${theme.sizes.modalPanelMaxWidth};
  min-height: ${theme.sizes.modalPanelMinHeight};
  background-color: ${theme.colors.primary};
  box-sizing: border-box;
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing.lg};
  align-items: stretch;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    min-height: 0;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${theme.colors.textOnDark};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &:hover {
    opacity: 0.85;
  }
`

const ProductImage = styled.img`
  width: ${theme.sizes.modalImageSize};
  height: ${theme.sizes.modalImageSize};
  flex-shrink: 0;
  object-fit: cover;
  align-self: flex-start;

  @media (max-width: 900px) {
    width: min(280px, 100%);
    height: min(280px, 80vw);
  }
`

const TextColumn = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding-right: ${theme.spacing.lg};

  @media (max-width: 900px) {
    padding-right: 0;
    width: 100%;
  }
`

const Title = styled.h2`
  margin: 0 0 ${theme.spacing.sm};
  font-family: ${theme.font.family};
  font-size: 18px;
  font-weight: 900;
  line-height: 1.2;
  color: ${theme.colors.textOnDark};
`

const Description = styled.p`
  margin: 0 0 ${theme.spacing.sm};
  font-family: ${theme.font.family};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${theme.colors.textOnDark};
`

const Serving = styled.p`
  margin: 0 0 ${theme.spacing.md};
  font-family: ${theme.font.family};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${theme.colors.textOnDark};
`

const AddButton = styled.button`
  align-self: flex-start;
  margin-top: auto;
  min-width: 218px;
  height: 24px;
  padding: 0 ${theme.spacing.sm};
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
  white-space: nowrap;

  &:hover {
    opacity: 0.92;
  }
`

type ProductModalProps = {
  isOpen: boolean
  product: MenuProduct | null
  onClose: () => void
  onConfirmAdd: () => void
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <path
        d="M4 4 L12 12 M12 4 L4 12"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ProductModal({
  isOpen,
  product,
  onClose,
  onConfirmAdd,
}: ProductModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  const handleOverlayPointerDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!isOpen || !product) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, product])

  useEffect(() => {
    if (!isOpen || !product) return
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, product, onClose])

  useEffect(() => {
    if (!isOpen || !product) return
    closeRef.current?.focus()
  }, [isOpen, product])

  if (!isOpen || !product) return null

  const label = `Adicionar ao carrinho - ${formatBrl(product.price)}`

  const handlePanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
    }
  }

  return createPortal(
    <Overlay
      role="presentation"
      onMouseDown={handleOverlayPointerDown}
    >
      <Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={handlePanelKeyDown}
      >
        <CloseButton
          ref={closeRef}
          type="button"
          aria-label="Fechar"
          onClick={onClose}
        >
          <CloseIcon />
        </CloseButton>
        <ProductImage src={product.image} alt="" />
        <TextColumn>
          <Title id={titleId}>{product.name}</Title>
          <Description>{product.description}</Description>
          <Serving>Serve: {product.servingPortion}</Serving>
          <AddButton
            type="button"
            onClick={() => {
              onConfirmAdd()
              onClose()
            }}
          >
            {label}
          </AddButton>
        </TextColumn>
      </Panel>
    </Overlay>,
    document.body,
  )
}
