import { type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectCartTotal } from '../../store/cartSlice'
import {
  selectCheckoutError,
  selectCheckoutStatus,
  selectPaymentForm,
  setStep,
  submitOrder,
  updatePayment,
} from '../../store/checkoutSlice'
import { isPaymentFormValid } from '../../utils/checkoutValidation'
import { formatBrl } from '../../utils/format'
import {
  CheckoutActions,
  CheckoutButton,
  CheckoutContent,
  CheckoutError,
  CheckoutField,
  CheckoutForm,
  CheckoutInput,
  CheckoutLabel,
  CheckoutRowCardCvv,
  CheckoutRowCepNumber,
  CheckoutScroll,
  CheckoutTitle,
} from './checkoutStyles'

export function PaymentStep() {
  const dispatch = useAppDispatch()
  const payment = useAppSelector(selectPaymentForm)
  const total = useAppSelector(selectCartTotal)
  const status = useAppSelector(selectCheckoutStatus)
  const errorMessage = useAppSelector(selectCheckoutError)
  const isValid = isPaymentFormValid(payment)
  const isLoading = status === 'loading'

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValid || isLoading) return
    dispatch(submitOrder())
  }

  return (
    <CheckoutScroll>
      <CheckoutContent>
        <CheckoutTitle>
          Pagamento - Valor a pagar {formatBrl(total)}
        </CheckoutTitle>
        <CheckoutForm onSubmit={handleSubmit}>
          <CheckoutField>
            <CheckoutLabel htmlFor="cardName">Nome no cartão</CheckoutLabel>
            <CheckoutInput
              id="cardName"
              name="cardName"
              value={payment.cardName}
              onChange={(e) =>
                dispatch(updatePayment({ cardName: e.target.value }))
              }
              required
            />
          </CheckoutField>
          <CheckoutRowCardCvv>
            <CheckoutField>
              <CheckoutLabel htmlFor="cardNumber">
                Número do cartão
              </CheckoutLabel>
              <CheckoutInput
                id="cardNumber"
                name="cardNumber"
                inputMode="numeric"
                value={payment.cardNumber}
                onChange={(e) =>
                  dispatch(updatePayment({ cardNumber: e.target.value }))
                }
                required
              />
            </CheckoutField>
            <CheckoutField>
              <CheckoutLabel htmlFor="cvv">CVV</CheckoutLabel>
              <CheckoutInput
                id="cvv"
                name="cvv"
                inputMode="numeric"
                value={payment.cvv}
                onChange={(e) =>
                  dispatch(updatePayment({ cvv: e.target.value }))
                }
                required
              />
            </CheckoutField>
          </CheckoutRowCardCvv>
          <CheckoutRowCepNumber>
            <CheckoutField>
              <CheckoutLabel htmlFor="expiresMonth">
                Mês de vencimento
              </CheckoutLabel>
              <CheckoutInput
                id="expiresMonth"
                name="expiresMonth"
                inputMode="numeric"
                placeholder="MM"
                value={payment.expiresMonth}
                onChange={(e) =>
                  dispatch(updatePayment({ expiresMonth: e.target.value }))
                }
                required
              />
            </CheckoutField>
            <CheckoutField>
              <CheckoutLabel htmlFor="expiresYear">
                Ano de vencimento
              </CheckoutLabel>
              <CheckoutInput
                id="expiresYear"
                name="expiresYear"
                inputMode="numeric"
                placeholder="AAAA"
                value={payment.expiresYear}
                onChange={(e) =>
                  dispatch(updatePayment({ expiresYear: e.target.value }))
                }
                required
              />
            </CheckoutField>
          </CheckoutRowCepNumber>
          {errorMessage ? (
            <CheckoutError role="alert">{errorMessage}</CheckoutError>
          ) : null}
          <CheckoutActions>
            <CheckoutButton type="submit" disabled={!isValid || isLoading}>
              {isLoading ? 'Processando…' : 'Finalizar pagamento'}
            </CheckoutButton>
            <CheckoutButton
              type="button"
              disabled={isLoading}
              onClick={() => dispatch(setStep('delivery'))}
            >
              Voltar para a edição de endereço
            </CheckoutButton>
          </CheckoutActions>
        </CheckoutForm>
      </CheckoutContent>
    </CheckoutScroll>
  )
}
