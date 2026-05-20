import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { buildCheckoutPayload } from '../utils/buildCheckoutPayload'
import { submitCheckout } from '../services/checkoutApi'
import type { RootState } from './store'

export type CheckoutStep = 'cart' | 'delivery' | 'payment' | 'confirmation'

export type DeliveryFormState = {
  receiver: string
  description: string
  city: string
  zipCode: string
  number: string
  complement: string
}

export type PaymentFormState = {
  cardName: string
  cardNumber: string
  cvv: string
  expiresMonth: string
  expiresYear: string
}

export type CheckoutState = {
  step: CheckoutStep
  delivery: DeliveryFormState
  payment: PaymentFormState
  orderId: string | null
  status: 'idle' | 'loading' | 'error'
  errorMessage: string | null
}

const emptyDelivery: DeliveryFormState = {
  receiver: '',
  description: '',
  city: '',
  zipCode: '',
  number: '',
  complement: '',
}

const emptyPayment: PaymentFormState = {
  cardName: '',
  cardNumber: '',
  cvv: '',
  expiresMonth: '',
  expiresYear: '',
}

const initialState: CheckoutState = {
  step: 'cart',
  delivery: emptyDelivery,
  payment: emptyPayment,
  orderId: null,
  status: 'idle',
  errorMessage: null,
}

export const submitOrder = createAsyncThunk(
  'checkout/submitOrder',
  async (_, { getState, rejectWithValue }) => {
    try {
      const payload = buildCheckoutPayload(getState() as RootState)
      return await submitCheckout(payload)
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : 'Erro ao finalizar o pedido.'
      return rejectWithValue(message)
    }
  },
)

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<CheckoutStep>) {
      state.step = action.payload
      if (action.payload !== 'confirmation') {
        state.status = 'idle'
        state.errorMessage = null
      }
    },
    updateDelivery(
      state,
      action: PayloadAction<Partial<DeliveryFormState>>,
    ) {
      state.delivery = { ...state.delivery, ...action.payload }
    },
    updatePayment(state, action: PayloadAction<Partial<PaymentFormState>>) {
      state.payment = { ...state.payment, ...action.payload }
    },
    resetCheckout() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = 'loading'
        state.errorMessage = null
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = 'idle'
        state.orderId = action.payload.orderId
        state.step = 'confirmation'
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = 'error'
        state.errorMessage =
          (action.payload as string) ?? 'Erro ao finalizar o pedido.'
      })
  },
})

export const { setStep, updateDelivery, updatePayment, resetCheckout } =
  checkoutSlice.actions

export default checkoutSlice.reducer

export const selectCheckoutStep = (state: RootState) => state.checkout.step
export const selectDeliveryForm = (state: RootState) => state.checkout.delivery
export const selectPaymentForm = (state: RootState) => state.checkout.payment
export const selectOrderId = (state: RootState) => state.checkout.orderId
export const selectCheckoutStatus = (state: RootState) => state.checkout.status
export const selectCheckoutError = (state: RootState) =>
  state.checkout.errorMessage
