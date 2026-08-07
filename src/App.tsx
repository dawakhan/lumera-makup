import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import FavoritesPage from './pages/FavoritesPage'
import InfoPage from './pages/InfoPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:categoryId" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/about" element={<InfoPage pageKey="about" />} />
        <Route path="/contact" element={<InfoPage pageKey="contact" />} />
        <Route path="/shipping" element={<InfoPage pageKey="shipping" />} />
        <Route path="/privacy" element={<InfoPage pageKey="privacy" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
