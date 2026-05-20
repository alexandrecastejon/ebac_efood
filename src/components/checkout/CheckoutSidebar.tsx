import styled from 'styled-components'
import { theme } from '../../styles/theme'
import { CHECKOUT_DRAWER_Z } from './constants'

export const CheckoutSidebar = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${CHECKOUT_DRAWER_Z + 1};
  width: min(${theme.sizes.cartSidebarWidth}, 100vw);
  height: 100vh;
  background-color: ${theme.colors.primary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.cartSidebarPaddingTop}
    ${theme.spacing.cartSidebarPaddingX} ${theme.spacing.sm};
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
`

export const CheckoutSidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  max-width: ${theme.sizes.checkoutFormWidth};
  margin: 0 auto;
`
