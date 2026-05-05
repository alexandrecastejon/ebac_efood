import styled from 'styled-components'
import { theme } from '../styles/theme'

export const Tag = styled.span`
  display: inline-block;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textOnDark};
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  margin-left: 8px;

  &:first-child {
    margin-left: 0;
  }
`
