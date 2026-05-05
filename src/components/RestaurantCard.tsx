import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { Restaurant } from '../data/restaurants'
import { ButtonLink } from './Button'
import { Tag } from './Tag'

const Card = styled.article`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.peach};
  overflow: hidden;
`

const ImageWrap = styled.div`
  position: relative;
`

const CardImage = styled.img`
  width: 100%;
  height: 217px;
  object-fit: cover;
`

const TagsOverlay = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`

const Body = styled.div`
  padding: 8px;
`

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`

const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 18px;
`

const Star = styled.span`
  color: ${theme.colors.star};
  font-size: 20px;
  line-height: 1;
`

const Description = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.375;
  min-height: 88px;
`

type RestaurantCardProps = {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card>
      <ImageWrap>
        <CardImage src={restaurant.cardImage} alt={restaurant.name} />
        <TagsOverlay>
          {restaurant.tags.map((label) => (
            <Tag key={label}>{label}</Tag>
          ))}
        </TagsOverlay>
      </ImageWrap>
      <Body>
        <TitleRow>
          <Title>{restaurant.name}</Title>
          <Rating>
            <Star aria-hidden>★</Star>
            {restaurant.rating.toFixed(1)}
          </Rating>
        </TitleRow>
        <Description>{restaurant.description}</Description>
        <ButtonLink to={`/restaurante/${restaurant.id}`} $variant="primary">
          Saiba mais
        </ButtonLink>
      </Body>
    </Card>
  )
}
