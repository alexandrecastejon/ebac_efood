/**
 * Tokens alinhados ao layout de referência efood (EBAC / Figma).
 * Ajuste fino pode ser feito comparando Inspect do Figma lado a lado com a página.
 */
export const theme = {
  colors: {
    bg: '#FFF8F2',
    primary: '#E66767',
    text: '#E66767',
    textOnDark: '#FFFFFF',
    peach: '#FFEBD9',
    overlay: 'rgba(0, 0, 0, 0.5)',
    star: '#FFB930',
    footerText: '#E66767',
    heroStripe: 'rgba(230, 103, 103, 0.07)',
  },
  font: {
    family: "'Roboto', system-ui, sans-serif",
  },
  typography: {
    logo: {
      fontSize: '36px',
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    heroTitle: {
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: 1.33,
    },
    navLink: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: 1.22,
    },
    cart: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.29,
    },
    restaurantCardTitle: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: 1.22,
    },
    restaurantCardBody: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    productCardTitle: {
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: 1.25,
    },
    productCardBody: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: 1.43,
    },
    bannerCategory: {
      fontSize: '32px',
      fontWeight: 300,
      lineHeight: 1.25,
    },
    bannerTitle: {
      fontSize: '40px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    footerDisclaimer: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    buttonPrimary: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.14,
    },
    buttonSecondary: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: 1.14,
    },
    rating: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: 1,
    },
    tag: {
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: 1.33,
    },
  },
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    xxl: '80px',
    containerPaddingX: '24px',
    gridGapHomeRow: '48px',
    gridGapHomeCol: '80px',
    gridGapRestaurant: '32px',
    sectionPaddingBottom: '120px',
    restaurantSectionPaddingTop: '56px',
    headerHomePaddingTop: '40px',
    headerRestaurantPaddingY: '32px',
    footerPaddingTop: '40px',
    footerPaddingBottom: '32px',
    footerLogoToSocial: '32px',
    footerSocialToDisclaimer: '80px',
    cardPaddingRestaurant: '8px',
    cardPaddingProduct: '8px',
    heroMarginTop: '64px',
    heroMarginBottom: '56px',
    heroPaddingY: '48px',
    heroPaddingX: '24px',
    heroTitleMaxWidth: '540px',
    tagGap: '8px',
    tagOffsetX: '16px',
    tagOffsetY: '16px',
  },
  radii: {
    button: '4px',
    tag: '0px',
  },
  sizes: {
    restaurantCardImageHeight: '217px',
    bannerMinHeight: '280px',
    socialIconCircle: '28px',
    socialIconGlyph: '14px',
    productImageAspectRatio: '1 / 1',
    disclaimerMaxWidth: '480px',
  },
  layout: {
    maxWidth: '1024px',
  },
} as const

export type Theme = typeof theme
