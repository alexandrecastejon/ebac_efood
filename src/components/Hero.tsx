import styled from 'styled-components'
import { theme } from '../styles/theme'

const HeroSection = styled.section`
  margin-top: 64px;
  margin-bottom: 56px;
  padding: 48px 24px 56px;
  text-align: center;
  background-color: ${theme.colors.bg};
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 12px,
    rgba(230, 103, 103, 0.08) 12px,
    rgba(230, 103, 103, 0.08) 13px
  );
`

const Title = styled.h1`
  margin: 0 auto;
  max-width: 540px;
  font-size: clamp(28px, 5vw, 36px);
  font-weight: 700;
  line-height: 1.25;
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
