import { Route, Routes } from 'react-router-dom'
import { CartDrawer } from './components/CartDrawer'
import { HomePage } from './pages/HomePage'
import { EntregaPage } from './pages/EntregaPage'
import { RestaurantPage } from './pages/RestaurantPage'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurante/:id" element={<RestaurantPage />} />
        <Route path="/entrega" element={<EntregaPage />} />
      </Routes>
      <CartDrawer />
    </>
  )
}
