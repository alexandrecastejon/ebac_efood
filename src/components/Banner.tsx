import styled from 'styled-components'
import { theme } from '../styles/theme'

const BannerWrap = styled.section<{ $image: string }>`
  position: relative;
  min-height: 280px;
  background-image: linear-gradient(
      ${theme.colors.overlay},
      ${theme.colors.overlay}
    ),
    url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 24px 16px 32px;
`

const Inner = styled.div`
  width: 100%;
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
`

const Category = styled.span`
  display: block;
  font-weight: 300;
  font-size: 32px;
  color: ${theme.colors.textOnDark};
  margin-bottom: 8px;
`

const Name = styled.h1`
  margin: 0;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  color: ${theme.colors.textOnDark};
`

type BannerProps = {
  category: string
  name: string
  image: string
}

export function Banner({ category, name, image }: BannerProps) {
  return (
    <BannerWrap $image={image}>
      <Inner>
        <Category>{category}</Category>
        <Name>{name}</Name>
      </Inner>
    </BannerWrap>
  )
}
