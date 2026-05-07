import { css } from 'styled-components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'

type Variant = 'primary' | 'secondary'

const buttonStyles = css<{ $variant?: Variant }>`
  cursor: pointer;
  border: none;
  border-radius: ${theme.radii.button};
  font-family: ${theme.font.family};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: opacity 0.2s ease;
  box-sizing: border-box;

  &:hover {
    opacity: 0.92;
  }

  ${({ $variant = 'primary' }) =>
    $variant === 'primary'
      ? css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.textOnDark};
          font-size: ${theme.typography.buttonPrimary.fontSize};
          font-weight: ${theme.typography.buttonPrimary.fontWeight};
          line-height: ${theme.typography.buttonPrimary.lineHeight};
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          min-height: 32px;
        `
      : css`
          background-color: ${theme.colors.peach};
          color: ${theme.colors.primary};
          font-size: ${theme.typography.buttonSecondary.fontSize};
          font-weight: ${theme.typography.buttonSecondary.fontWeight};
          line-height: ${theme.typography.buttonSecondary.lineHeight};
          width: 100%;
          padding: ${theme.spacing.sm} ${theme.spacing.sm};
          min-height: 40px;
        `}
`

export const Button = styled.button<{ $variant?: Variant }>`
  ${buttonStyles}
`

export const ButtonLink = styled(Link)<{ $variant?: Variant }>`
  ${buttonStyles}
  text-decoration: none;
`
