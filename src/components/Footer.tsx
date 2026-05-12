import styled from 'styled-components'
import { theme } from '../styles/theme'
import logoImg from '../assets/logos/logo.png'
import iconInstagram from '../assets/icons/instagram-round-svgrepo-com (1) 1.png'
import iconFacebook from '../assets/icons/facebook-round-svgrepo-com 1.png'
import iconTwitter from '../assets/icons/twitter-2-svgrepo-com 1.png'

const FooterWrap = styled.footer`
  margin-top: auto;
  min-height: ${theme.sizes.footerMinHeight};
  padding: ${theme.spacing.footerPaddingTop} ${theme.spacing.containerPaddingX}
    ${theme.spacing.footerPaddingBottom};
  background-color: ${theme.colors.peach};
  text-align: center;
`

const LogoBlock = styled.div`
  margin-bottom: ${theme.spacing.footerLogoToSocial};
`

const LogoImg = styled.img`
  width: ${theme.sizes.logoImgWidth};
  height: ${theme.sizes.logoImgHeight};
  object-fit: contain;
  display: block;
  margin: 0 auto;
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
  text-decoration: none;
  flex-shrink: 0;

  &:hover {
    opacity: 0.9;
  }

  img {
    width: ${theme.sizes.socialIconCircle};
    height: ${theme.sizes.socialIconCircle};
    object-fit: contain;
    display: block;
  }
`

const Disclaimer = styled.p`
  margin: 0 auto;
  max-width: ${theme.sizes.disclaimerMaxWidth};
  text-align: center;
  font-family: ${theme.font.family};
  font-size: ${theme.typography.footerDisclaimer.fontSize};
  font-weight: ${theme.typography.footerDisclaimer.fontWeight};
  line-height: ${theme.typography.footerDisclaimer.lineHeight};
  color: ${theme.colors.footerText};
`

export function Footer() {
  return (
    <FooterWrap>
      <LogoBlock>
        <LogoImg src={logoImg} alt="efood" />
      </LogoBlock>
      <SocialRow>
        <SocialLink href="#" aria-label="Twitter">
          <img src={iconTwitter} alt="" />
        </SocialLink>
        <SocialLink href="#" aria-label="Instagram">
          <img src={iconInstagram} alt="" />
        </SocialLink>
        <SocialLink href="#" aria-label="Facebook">
          <img src={iconFacebook} alt="" />
        </SocialLink>
      </SocialRow>
      <Disclaimer>
        A efood é uma plataforma para divulgação de estabelecimentos, a
        responsabilidade pela entrega, qualidade dos produtos é toda do
        estabelecimento contratado.
      </Disclaimer>
    </FooterWrap>
  )
}
