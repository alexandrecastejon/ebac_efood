import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { CHECKOUT_DRAWER_Z } from './constants'

export const CheckoutOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${CHECKOUT_DRAWER_Z};
  background-color: ${theme.colors.overlayModal};
  box-sizing: border-box;
`
