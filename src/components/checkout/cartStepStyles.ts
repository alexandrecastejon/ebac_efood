import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const ProductsScroll = styled.div`
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

export const EmptyMessage = styled.p`
  margin: ${theme.spacing.lg} 0 0;
  text-align: center;
  font-family: ${theme.font.family};
  font-size: ${theme.typography.cartTotal.fontSize};
  font-weight: ${theme.typography.cartTotal.fontWeight};
  color: ${theme.colors.peach};
  line-height: 1.4;
`

export const ItemCard = styled.article`
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

export const Thumb = styled.img`
  width: ${theme.sizes.cartThumbSize};
  height: ${theme.sizes.cartThumbSize};
  object-fit: cover;
  display: block;
`

export const ItemBody = styled.div`
  position: relative;
  min-width: 0;
  height: ${theme.sizes.cartThumbSize};
  padding-right: ${theme.sizes.cartTrashSize};
`

export const ItemName = styled.h3`
  margin: 0;
  font-family: ${theme.font.family};
  font-size: ${theme.typography.cartItemTitle.fontSize};
  font-weight: ${theme.typography.cartItemTitle.fontWeight};
  line-height: ${theme.typography.cartItemTitle.lineHeight};
  color: ${theme.colors.primary};
`

export const ItemPrice = styled.p`
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

export const RemoveButton = styled.button`
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

export const TrashIconImg = styled.img`
  width: ${theme.sizes.cartTrashSize};
  height: ${theme.sizes.cartTrashSize};
  object-fit: contain;
  display: block;
`

export const CartFooter = styled.footer`
  flex-shrink: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.cartFooterGap};
  margin-top: ${theme.spacing.cartFooterMarginTop};
`

export const TotalRow = styled.div`
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

export const TotalLabel = styled.span`
  flex-shrink: 0;
`

export const TotalValue = styled.span`
  flex-shrink: 0;
  text-align: right;
`
