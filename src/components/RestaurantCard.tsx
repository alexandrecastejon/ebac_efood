import styled from 'styled-components'
import { theme } from '../styles/theme'
import type { Restaurant } from '../data/restaurants'
import { ButtonLink } from './Button'
import { Tag } from './Tag'

const Card = styled.article`
  background-color: ${theme.colors.white};
  color: ${theme.colors.primary};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid ${theme.colors.primary};
  max-width: ${theme.sizes.restaurantCardWidth};
`

const ImageWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`

const CardImage = styled.img`
  width: 100%;
  height: ${theme.sizes.restaurantCardImageHeight};
  object-fit: cover;
`

const TagsOverlay = styled.div`
  position: absolute;
  top: ${theme.spacing.tagOffsetY};
  right: ${theme.spacing.tagOffsetX};
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${theme.spacing.tagGap};
`

const Body = styled.div`
  padding: ${theme.spacing.cardPaddingRestaurant};
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
`

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
`

const Title = styled.h2`
  margin: 0;
  flex: 1;
  min-width: 0;
  font-family: ${theme.font.family};
  font-size: ${theme.typography.restaurantCardTitle.fontSize};
  font-weight: ${theme.typography.restaurantCardTitle.fontWeight};
  line-height: ${theme.typography.restaurantCardTitle.lineHeight};
`

const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.tagGap};
  flex-shrink: 0;
  font-family: ${theme.font.family};
  font-weight: ${theme.typography.rating.fontWeight};
  font-size: ${theme.typography.rating.fontSize};
  line-height: ${theme.typography.rating.lineHeight};
`

const Star = styled.span`
  color: ${theme.colors.star};
  font-size: 22px;
  line-height: 1;
`

const Description = styled.p`
  margin: 0 0 ${theme.spacing.sm};
  flex: 1;
  font-family: ${theme.font.family};
  font-size: ${theme.typography.restaurantCardBody.fontSize};
  font-weight: ${theme.typography.restaurantCardBody.fontWeight};
  line-height: ${theme.typography.restaurantCardBody.lineHeight};
  color: ${theme.colors.primary};
`

const CardActions = styled.div`
  margin-top: auto;
  align-self: flex-start;
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
            {restaurant.rating.toFixed(1)}
            <Star aria-hidden>★</Star>
          </Rating>
        </TitleRow>
        <Description>{restaurant.description}</Description>
        <CardActions>
          <ButtonLink to={`/restaurante/${restaurant.id}`} $variant="primary">
            Saiba mais
          </ButtonLink>
        </CardActions>
      </Body>
    </Card>
  )
}
