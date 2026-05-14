import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { MenuProduct } from '../types/restaurant'
import { Button } from './Button'

const Card = styled.article`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.cardPaddingProduct};
  width: ${theme.sizes.productCardWidth};
  height: ${theme.sizes.productCardHeight};
  border: 1px solid ${theme.colors.primary};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

const ProductImage = styled.img`
  width: ${theme.sizes.productInnerWidth};
  height: ${theme.sizes.productImageHeight};
  object-fit: cover;
  margin-bottom: ${theme.spacing.tagGap};
  flex-shrink: 0;
`

const Title = styled.h3`
  margin: 0 0 ${theme.spacing.tagGap};
  font-family: ${theme.font.family};
  font-size: ${theme.typography.productCardTitle.fontSize};
  font-weight: ${theme.typography.productCardTitle.fontWeight};
  line-height: ${theme.typography.productCardTitle.lineHeight};
  color: ${theme.colors.peach};
`

const Description = styled.p`
  margin: 0 0 ${theme.spacing.sm};
  flex: 1;
  font-family: ${theme.font.family};
  font-size: ${theme.typography.productCardBody.fontSize};
  font-weight: ${theme.typography.productCardBody.fontWeight};
  line-height: ${theme.typography.productCardBody.lineHeight};
  color: ${theme.colors.peach};
`

const CardActions = styled.div`
  margin-top: auto;
`

type ProductCardProps = {
  product: MenuProduct
  onAddClick: () => void
}

export function ProductCard({ product, onAddClick }: ProductCardProps) {
  return (
    <Card>
      <ProductImage src={product.image} alt={product.name} />
      <Title>{product.name}</Title>
      <Description>{product.description}</Description>
      <CardActions>
        <Button type="button" $variant="secondary" onClick={onAddClick}>
          Adicionar ao carrinho
        </Button>
      </CardActions>
    </Card>
  )
}
