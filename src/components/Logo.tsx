import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'

const LogoText = styled.span`
  font-family: ${theme.font.family};
  font-weight: ${theme.typography.logo.fontWeight};
  font-size: ${theme.typography.logo.fontSize};
  letter-spacing: ${theme.typography.logo.letterSpacing};
  color: ${theme.colors.primary};
`

const StyledLogoLink = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const LogoPlain = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

type LogoProps = {
  to?: string
  className?: string
}

export function Logo({ to, className }: LogoProps) {
  const content = <LogoText>efood</LogoText>

  if (to) {
    return (
      <StyledLogoLink to={to} className={className}>
        {content}
      </StyledLogoLink>
    )
  }

  return <LogoPlain className={className}>{content}</LogoPlain>
}
