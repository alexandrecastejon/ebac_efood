import styled from 'styled-components'
import { theme } from '../styles/theme'
import { Container } from './Container'

const BannerWrap = styled.section<{ $image: string }>`
  position: relative;
  height: ${theme.sizes.bannerMinHeight};
  background-image: linear-gradient(
      ${theme.colors.overlay},
      ${theme.colors.overlay}
    ),
    url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
`

const Inner = styled(Container)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
`

const Category = styled.span`
  display: block;
  font-family: ${theme.font.family};
  font-weight: ${theme.typography.bannerCategory.fontWeight};
  font-size: ${theme.typography.bannerCategory.fontSize};
  line-height: ${theme.typography.bannerCategory.lineHeight};
  color: ${theme.colors.textOnDark};
`

const Name = styled.h1`
  margin: 0;
  font-family: ${theme.font.family};
  font-weight: ${theme.typography.bannerTitle.fontWeight};
  font-size: ${theme.typography.bannerTitle.fontSize};
  line-height: ${theme.typography.bannerTitle.lineHeight};
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
