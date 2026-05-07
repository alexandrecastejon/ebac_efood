import styled from 'styled-components'
import { theme } from '../styles/theme'
import { Logo } from './Logo'

const FooterWrap = styled.footer`
  margin-top: auto;
  padding: ${theme.spacing.footerPaddingTop} ${theme.spacing.containerPaddingX}
    ${theme.spacing.footerPaddingBottom};
  background-color: ${theme.colors.peach};
  text-align: center;
`

const LogoBlock = styled.div`
  margin-bottom: ${theme.spacing.footerLogoToSocial};
`

const SocialRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.tagGap};
  margin-bottom: ${theme.spacing.footerSocialToDisclaimer};
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${theme.sizes.socialIconCircle};
  height: ${theme.sizes.socialIconCircle};
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  text-decoration: none;
  flex-shrink: 0;

  &:hover {
    opacity: 0.9;
  }

  svg {
    width: ${theme.sizes.socialIconGlyph};
    height: ${theme.sizes.socialIconGlyph};
    fill: currentColor;
  }
`

const Disclaimer = styled.p`
  margin: 0 auto;
  max-width: ${theme.sizes.disclaimerMaxWidth};
  font-family: ${theme.font.family};
  font-size: ${theme.typography.footerDisclaimer.fontSize};
  font-weight: ${theme.typography.footerDisclaimer.fontWeight};
  line-height: ${theme.typography.footerDisclaimer.lineHeight};
  color: ${theme.colors.footerText};
`

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 7.2A4.8 4.8 0 1016.8 12 4.81 4.81 0 0012 7.2zm0 8a3.13 3.13 0 113.13-3.13A3.13 3.13 0 0112 15.2zm5.78-9.37a1.12 1.12 0 11-1.12 1.12 1.12 1.12 0 011.12-1.12zM20.4 6a5.66 5.66 0 00-1.59-3.81A5.57 5.57 0 0014.76.6h-5.5A5.67 5.67 0 005.4 2.22 5.58 5.58 0 003.6 6v12a5.67 5.67 0 001.8 3.78A5.57 5.57 0 009.26 23.4h5.5a5.67 5.67 0 003.81-1.62 5.58 5.58 0 001.83-3.78V6zm-2.25 14a3.29 3.29 0 01-1 2.33 3.22 3.22 0 01-2.33 1h-5.5a3.29 3.29 0 01-2.33-1 3.22 3.22 0 01-1-2.33V8a3.29 3.29 0 011-2.33A3.22 3.22 0 019.26 4.8h5.5a3.29 3.29 0 012.33 1 3.22 3.22 0 011 2.33z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M13 10h2.5V8c0-.9.2-1.7.7-2.2.6-.6 1.5-.9 2.8-.9h2V9h-1.5c-.8 0-1.3.1-1.5.3-.2.2-.3.6-.3 1.1v1.6H19l-.4 2h-2.1V22h-3v-9h-2v-2h2v-1z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M18.9 3h3.4l-7.4 8.5L23 21h-6.8l-5.3-6.9L5 21H1.6l7.9-9.1L1 3h7l4.8 6.2L18.9 3zm-1.2 16.2h1.9L6.9 4.7H4.8l12.9 14.5z" />
    </svg>
  )
}

export function Footer() {
  return (
    <FooterWrap>
      <LogoBlock>
        <Logo />
      </LogoBlock>
      <SocialRow>
        <SocialLink href="#" aria-label="Instagram">
          <InstagramIcon />
        </SocialLink>
        <SocialLink href="#" aria-label="Facebook">
          <FacebookIcon />
        </SocialLink>
        <SocialLink href="#" aria-label="Twitter">
          <TwitterIcon />
        </SocialLink>
      </SocialRow>
      <Disclaimer>
        A efood é uma plataforma para divulgação de estabelecimentos. A
        responsabilidade pela entrega e qualidade dos produtos é inteiramente do
        estabelecimento contratado.
      </Disclaimer>
    </FooterWrap>
  )
}
