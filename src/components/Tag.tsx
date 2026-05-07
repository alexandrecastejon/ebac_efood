import styled from 'styled-components'
import { theme } from '../styles/theme'

export const Tag = styled.span`
  display: inline-block;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textOnDark};
  font-family: ${theme.font.family};
  font-size: ${theme.typography.tag.fontSize};
  font-weight: ${theme.typography.tag.fontWeight};
  line-height: ${theme.typography.tag.lineHeight};
  padding: ${theme.spacing.xs};
  border-radius: ${theme.radii.tag};
`
