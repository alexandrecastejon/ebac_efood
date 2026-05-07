import styled from 'styled-components'
import { theme } from '../styles/theme'

const HeroSection = styled.section`
  margin-top: ${theme.spacing.heroMarginTop};
  margin-bottom: ${theme.spacing.heroMarginBottom};
  padding: ${theme.spacing.heroPaddingY} ${theme.spacing.heroPaddingX};
  text-align: center;
  background-color: ${theme.colors.bg};
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 10px,
    ${theme.colors.heroStripe} 10px,
    ${theme.colors.heroStripe} 11px
  );
`

const Title = styled.h1`
  margin: 0 auto;
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
      <Title>
        Viva experiências gastronômicas no conforto da sua casa
      </Title>
    </HeroSection>
  )
}
