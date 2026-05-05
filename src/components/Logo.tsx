import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from '../styles/theme'

const LogoText = styled.span`
  font-weight: 700;
  font-size: 36px;
  color: ${theme.colors.primary};
  letter-spacing: -0.5px;
`

const StyledLogoLink = styled(Link)`
  text-decoration: none;
`

type LogoProps = {
  /** Quando omitido, exibe apenas o texto sem link (ex.: rodapé). */
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

  return <span className={className}>{content}</span>
}
