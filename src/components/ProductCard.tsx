import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { Product } from '../data/restaurants'
import { Button } from './Button'

const Card = styled.article`
  background-color: ${theme.colors.primary};
  padding: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  margin-bottom: 8px;
`

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.peach};
`

const Description = styled.p`
  margin: 0 0 8px;
  flex: 1;
  font-size: 14px;
  line-height: 1.375;
  color: ${theme.colors.peach};
`

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <ProductImage src={product.image} alt={product.name} />
      <Title>{product.name}</Title>
      <Description>{product.description}</Description>
      <Button type="button" $variant="secondary">
        Adicionar ao carrinho
      </Button>
    </Card>
  )
}
