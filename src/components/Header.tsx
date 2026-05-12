import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'
import fundo from '../assets/backgrounds/fundo.png'
import logoImg from '../assets/logos/logo.png'
import { Container } from './Container'
import { Logo } from './Logo'

type HeaderVariant = 'home' | 'restaurant'

const Bar = styled.header<{ $variant: HeaderVariant }>`
  background-color: ${theme.colors.peach};
  background-image: ${({ $variant }) =>
    $variant === 'home'
      ? `repeating-linear-gradient(
    90deg,
    transparent,
    transparent 10px,
    ${theme.colors.heroStripe} 10px,
    ${theme.colors.heroStripe} 11px
  )`
      : `url(${fundo})`};
  background-size: auto;
  background-position: center;
  background-repeat: repeat;
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
  text-align: left;
  min-width: 0;
`

const NavCenter = styled.div`
  justify-self: center;
`

const NavRight = styled.div`
  justify-self: end;
  max-width: ${theme.sizes.headerCartMaxWidth};
  text-align: right;
  white-space: nowrap;
  font-family: ${theme.font.family};
  font-weight: ${theme.typography.headerSideText.fontWeight};
  font-size: ${theme.typography.headerSideText.fontSize};
  line-height: ${theme.typography.headerSideText.lineHeight};
  letter-spacing: ${theme.typography.headerSideText.letterSpacing};
  color: ${theme.colors.primary};
`

const StyledNavLink = styled(Link)`
  text-decoration: none;
  font-family: ${theme.font.family};
  font-weight: ${theme.typography.headerSideText.fontWeight};
  font-size: ${theme.typography.headerSideText.fontSize};
  line-height: ${theme.typography.headerSideText.lineHeight};
  letter-spacing: ${theme.typography.headerSideText.letterSpacing};
  color: ${theme.colors.primary};
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`

const HomeLogoRow = styled(Container)`
  display: flex;
  justify-content: center;
`

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`

const LogoImg = styled.img`
  width: ${theme.sizes.logoImgWidth};
  height: ${theme.sizes.logoImgHeight};
  object-fit: contain;
  display: block;
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
          <LogoLink to="/">
            <LogoImg src={logoImg} alt="efood" />
          </LogoLink>
        </NavCenter>
        <NavRight>0 produto(s) no carrinho</NavRight>
      </RestaurantBarInner>
    </Bar>
  )
}
