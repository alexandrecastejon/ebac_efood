import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import { Container } from './Container'
import { Logo } from './Logo'

type HeaderVariant = 'home' | 'restaurant'

const Bar = styled.header<{ $variant: HeaderVariant }>`
  padding: ${({ $variant }) => ($variant === 'home' ? '40px 0 0' : '24px 0')};
`

const RestaurantBarInner = styled(Container)`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
`

const NavLeft = styled.div`
  justify-self: start;
`

const NavCenter = styled.div`
  justify-self: center;
`

const NavRight = styled.div`
  justify-self: end;
  font-weight: 700;
  font-size: 14px;
  color: ${theme.colors.primary};
`

const StyledNavLink = styled(Link)`
  text-decoration: none;
  font-weight: 700;
  font-size: 18px;
  color: ${theme.colors.primary};

  &:hover {
    text-decoration: underline;
  }
`

const HomeLogoWrap = styled.div`
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
        <HomeLogoWrap>
          <Logo to="/" />
        </HomeLogoWrap>
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
