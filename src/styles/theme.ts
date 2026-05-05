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
  },
  font: {
    family: "'Roboto', system-ui, sans-serif",
  },
  layout: {
    maxWidth: '1024px',
  },
} as const

export type Theme = typeof theme
