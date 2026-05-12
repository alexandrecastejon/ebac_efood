import styled from 'styled-components'
import { theme } from '../styles/theme'
import fundo from '../assets/backgrounds/fundo.png'
import logo from '../assets/logos/logo.png'

const HeroSection = styled.section`
  margin-top: 0;
  margin-bottom: ${theme.spacing.heroMarginBottom};
  min-height: 384px;
  padding: 64px ${theme.spacing.heroPaddingX} 0;
  text-align: center;
  background-color: ${theme.colors.peach};
  background-image: url(${fundo});
  background-size: auto;
  background-position: center;
  background-repeat: repeat;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${theme.spacing.lg};
`

const LogoImg = styled.img`
  width: ${theme.sizes.logoImgWidth};
  height: ${theme.sizes.logoImgHeight};
  object-fit: contain;
  display: block;
  flex-shrink: 0;
`

const Title = styled.h1`
  margin: 100px auto 0;
  max-width: ${theme.spacing.heroTitleMaxWidth};
  font-family: ${theme.font.family};
  font-size: ${theme.typography.heroTitle.fontSize};
  font-weight: ${theme.typography.heroTitle.fontWeight};
  line-height: ${theme.typography.heroTitle.lineHeight};
  color: ${theme.colors.primary};
`

export function Hero() {
  return (
    <HeroSection>
      <LogoImg src={logo} alt="efood" />
      <Title>
        Viva experiências gastronômicas no conforto da sua casa
      </Title>
    </HeroSection>
  )
}
