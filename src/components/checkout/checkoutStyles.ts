import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const CheckoutContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${theme.sizes.checkoutFormWidth};
`

export const CheckoutScroll = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-gutter: stable;
  padding-right: 2px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 235, 217, 0.45);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 235, 217, 0.65);
  }
`

export const CheckoutTitle = styled.h2`
  margin: ${theme.spacing.checkoutTitleMarginTop} 0
    ${theme.spacing.checkoutTitleMarginBottom};
  font-family: ${theme.font.family};
  font-size: ${theme.typography.checkoutTitle.fontSize};
  font-weight: ${theme.typography.checkoutTitle.fontWeight};
  line-height: ${theme.typography.checkoutTitle.lineHeight};
  color: ${theme.colors.peach};
`

export const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.checkoutFieldGap};
  width: 100%;
`

export const CheckoutField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.checkoutLabelInputGap};
  width: 100%;
`

export const CheckoutLabel = styled.label`
  font-family: ${theme.font.family};
  font-size: ${theme.typography.checkoutLabel.fontSize};
  font-weight: ${theme.typography.checkoutLabel.fontWeight};
  line-height: ${theme.typography.checkoutLabel.lineHeight};
  color: ${theme.colors.peach};
`

export const CheckoutInput = styled.input`
  width: 100%;
  height: ${theme.sizes.checkoutInputHeight};
  padding: 0 ${theme.spacing.xs};
  box-sizing: border-box;
  border: none;
  border-radius: ${theme.radii.button};
  background-color: ${theme.colors.peach};
  color: ${theme.colors.primary};
  font-family: ${theme.font.family};
  font-size: ${theme.typography.checkoutInput.fontSize};
  font-weight: ${theme.typography.checkoutInput.fontWeight};
  line-height: ${theme.typography.checkoutInput.lineHeight};

  &::placeholder {
    color: ${theme.colors.primary};
    opacity: 0.6;
  }
`

export const CheckoutRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.checkoutRowGap};
  width: 100%;
`

export const CheckoutRowCepNumber = styled.div`
  display: grid;
  grid-template-columns: ${theme.sizes.checkoutFieldWidth} ${theme.sizes.checkoutFieldWidth};
  gap: ${theme.spacing.checkoutCepNumberGap};
  width: 100%;
`

export const CheckoutRowCardCvv = styled.div`
  display: grid;
  grid-template-columns: ${theme.sizes.checkoutCardNumberWidth} ${theme.sizes.checkoutCvvWidth};
  gap: ${theme.spacing.checkoutCardCvvGap};
  width: 100%;
`

export const CheckoutActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${theme.spacing.checkoutButtonGap};
  width: 100%;
  max-width: ${theme.sizes.checkoutButtonWidth};
  margin-top: ${theme.spacing.checkoutActionsMarginTop};
  flex-shrink: 0;
`

export const CheckoutButton = styled.button`
  width: 100%;
  max-width: ${theme.sizes.checkoutButtonWidth};
  height: ${theme.sizes.checkoutButtonHeight};
  min-height: ${theme.sizes.checkoutButtonHeight};
  padding: 0;
  box-sizing: border-box;
  border: none;
  border-radius: ${theme.radii.button};
  background-color: ${theme.colors.peach};
  color: ${theme.colors.primary};
  font-family: ${theme.font.family};
  font-size: ${theme.typography.checkoutButton.fontSize};
  font-weight: ${theme.typography.checkoutButton.fontWeight};
  line-height: ${theme.typography.checkoutButton.lineHeight};
  letter-spacing: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;

  &:hover:not(:disabled) {
    opacity: 0.95;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const CheckoutError = styled.p`
  margin: 0;
  font-family: ${theme.font.family};
  font-size: ${theme.typography.checkoutLabel.fontSize};
  font-weight: ${theme.typography.checkoutLabel.fontWeight};
  line-height: ${theme.typography.checkoutBody.lineHeight};
  color: ${theme.colors.peach};
`

export const ConfirmationText = styled.p`
  margin: 0;
  width: 100%;
  max-width: ${theme.sizes.checkoutFormWidth};
  font-family: ${theme.font.family};
  font-size: ${theme.typography.checkoutBody.fontSize};
  font-weight: ${theme.typography.checkoutBody.fontWeight};
  line-height: ${theme.typography.checkoutBody.lineHeight};
  letter-spacing: ${theme.typography.checkoutBody.letterSpacing};
  color: ${theme.colors.peach};
  white-space: pre-line;
`
