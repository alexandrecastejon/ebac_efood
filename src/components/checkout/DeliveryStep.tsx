import { type FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectDeliveryForm,
  setStep,
  updateDelivery,
} from '../../store/checkoutSlice'
import { isDeliveryFormValid } from '../../utils/checkoutValidation'
import {
  CheckoutActions,
  CheckoutButton,
  CheckoutContent,
  CheckoutField,
  CheckoutForm,
  CheckoutInput,
  CheckoutLabel,
  CheckoutRowCepNumber,
  CheckoutScroll,
  CheckoutTitle,
} from './checkoutStyles'

export function DeliveryStep() {
  const dispatch = useAppDispatch()
  const delivery = useAppSelector(selectDeliveryForm)
  const isValid = isDeliveryFormValid(delivery)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    dispatch(setStep('payment'))
  }

  return (
    <CheckoutScroll>
      <CheckoutContent>
        <CheckoutTitle>Entrega</CheckoutTitle>
        <CheckoutForm onSubmit={handleSubmit}>
          <CheckoutField>
            <CheckoutLabel htmlFor="receiver">Quem irá receber</CheckoutLabel>
            <CheckoutInput
              id="receiver"
              name="receiver"
              value={delivery.receiver}
              onChange={(e) =>
                dispatch(updateDelivery({ receiver: e.target.value }))
              }
              required
            />
          </CheckoutField>
          <CheckoutField>
            <CheckoutLabel htmlFor="description">Endereço</CheckoutLabel>
            <CheckoutInput
              id="description"
              name="description"
              value={delivery.description}
              onChange={(e) =>
                dispatch(updateDelivery({ description: e.target.value }))
              }
              required
            />
          </CheckoutField>
          <CheckoutField>
            <CheckoutLabel htmlFor="city">Cidade</CheckoutLabel>
            <CheckoutInput
              id="city"
              name="city"
              value={delivery.city}
              onChange={(e) =>
                dispatch(updateDelivery({ city: e.target.value }))
              }
              required
            />
          </CheckoutField>
          <CheckoutRowCepNumber>
            <CheckoutField>
              <CheckoutLabel htmlFor="zipCode">CEP</CheckoutLabel>
              <CheckoutInput
                id="zipCode"
                name="zipCode"
                value={delivery.zipCode}
                onChange={(e) =>
                  dispatch(updateDelivery({ zipCode: e.target.value }))
                }
                required
              />
            </CheckoutField>
            <CheckoutField>
              <CheckoutLabel htmlFor="number">Número</CheckoutLabel>
              <CheckoutInput
                id="number"
                name="number"
                inputMode="numeric"
                value={delivery.number}
                onChange={(e) =>
                  dispatch(updateDelivery({ number: e.target.value }))
                }
                required
              />
            </CheckoutField>
          </CheckoutRowCepNumber>
          <CheckoutField>
            <CheckoutLabel htmlFor="complement">
              Complemento (opcional)
            </CheckoutLabel>
            <CheckoutInput
              id="complement"
              name="complement"
              value={delivery.complement}
              onChange={(e) =>
                dispatch(updateDelivery({ complement: e.target.value }))
              }
            />
          </CheckoutField>
          <CheckoutActions>
            <CheckoutButton type="submit" disabled={!isValid}>
              Continuar com o pagamento
            </CheckoutButton>
            <CheckoutButton
              type="button"
              onClick={() => dispatch(setStep('cart'))}
            >
              Voltar para o carrinho
            </CheckoutButton>
          </CheckoutActions>
        </CheckoutForm>
      </CheckoutContent>
    </CheckoutScroll>
  )
}
