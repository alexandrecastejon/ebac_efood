import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import { Container } from './Container'
import { Logo } from './Logo'

type HeaderVariant = 'home' | 'restaurant'

const Bar = styled.header<{ $variant: HeaderVariant }>`
  background-color: ${theme.colors.peach};
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 10px,
    ${theme.colors.heroStripe} 10px,
    ${theme.colors.heroStripe} 11px
  );
  height: ${theme.spacing.headerHeight};
  display: flex;
  align-items: center;
  padding-top: ${({ $variant }) =>
    $variant === 'home'
      ? theme.spacing.headerHomePaddingTop
      : theme.spacing.headerRestaurantPaddingY};
  padding-bottom: ${({ $variant }) =>
    $variant === 'home' ? '0' : theme.spacing.headerRestaurantPaddingY};
`

const RestaurantBarInner = styled(Container)`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${theme.spacing.sm};
`

const NavLeft = styled.div`
  justify-self: start;
`

const NavCenter = styled.div`
  justify-self: center;
`

const NavRight = styled.div`
  justify-self: end;
  max-width: 258px;
  text-align: right;
  font-family: ${theme.font.family};
  font-weight: ${theme.typography.cart.fontWeight};
  font-size: ${theme.typography.cart.fontSize};
  line-height: ${theme.typography.cart.lineHeight};
  color: ${theme.colors.primary};
`

const StyledNavLink = styled(Link)`
  text-decoration: none;
  font-family: ${theme.font.family};
  font-weight: ${theme.typography.navLink.fontWeight};
  font-size: ${theme.typography.navLink.fontSize};
  line-height: ${theme.typography.navLink.lineHeight};
  color: ${theme.colors.primary};

  &:hover {
    text-decoration: underline;
  }
`

const HomeLogoRow = styled(Container)`
  display: flex;
  justify-content: center;
`

type HeaderProps = {
  variant: HeaderVariant
}

export function Header({ variant }: HeaderProps) {
  if (variant === 'home') {
    return (
      <Bar $variant="home">
        <HomeLogoRow>
          <Logo to="/" />
        </HomeLogoRow>
      </Bar>
    )
  }

  return (
    <Bar $variant="restaurant">
      <RestaurantBarInner>
        <NavLeft>
          <StyledNavLink to="/">Restaurantes</StyledNavLink>
        </NavLeft>
        <NavCenter>
          <Logo to="/" />
        </NavCenter>
        <NavRight>0 produto(s) no carrinho</NavRight>
      </RestaurantBarInner>
    </Bar>
  )
}
