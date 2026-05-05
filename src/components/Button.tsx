import { css } from 'styled-components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'

type Variant = 'primary' | 'secondary'

const buttonStyles = css<{ $variant?: Variant }>`
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-family: ${theme.font.family};
  font-size: 14px;
  font-weight: 700;
  padding: 4px 8px;
  min-height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.92;
  }

  ${({ $variant = 'primary' }) =>
    $variant === 'primary'
      ? css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.textOnDark};
        `
      : css`
          background-color: ${theme.colors.peach};
          color: ${theme.colors.primary};
          width: 100%;
          padding: 8px 12px;
          min-height: auto;
        `}
`

export const Button = styled.button<{ $variant?: Variant }>`
  ${buttonStyles}
`

export const ButtonLink = styled(Link)<{ $variant?: Variant }>`
  ${buttonStyles}
  text-decoration: none;
`
