import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { MenuProduct } from '../types/restaurant'
import { Button } from './Button'

const LINE_CLAMP = 4

const Card = styled.article`
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.cardPaddingProduct};
  width: 100%;
  max-width: ${theme.sizes.productCardWidth};
  min-height: ${theme.sizes.productCardMinHeight};
  height: 100%;
  border: 1px solid ${theme.colors.primary};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
`

const ProductImage = styled.img`
  width: 100%;
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
  flex-shrink: 0;
`

const Description = styled.p`
  margin: 0 0 ${theme.spacing.sm};
  flex: 1 1 auto;
  min-height: 0;
  font-family: ${theme.font.family};
  font-size: ${theme.typography.productCardBody.fontSize};
  font-weight: ${theme.typography.productCardBody.fontWeight};
  line-height: ${theme.typography.productCardBody.lineHeight};
  color: ${theme.colors.peach};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${LINE_CLAMP};
`

const CardActions = styled.div`
  margin-top: auto;
  flex-shrink: 0;
  width: 100%;
`

type ProductCardProps = {
  product: MenuProduct
  onMoreDetails: () => void
}

export function ProductCard({ product, onMoreDetails }: ProductCardProps) {
  return (
    <Card>
      <ProductImage src={product.image} alt={product.name} />
      <Title>{product.name}</Title>
      <Description title={product.description}>{product.description}</Description>
      <CardActions>
        <Button type="button" $variant="secondary" onClick={onMoreDetails}>
          Mais detalhes
        </Button>
      </CardActions>
    </Card>
  )
}
