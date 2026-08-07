import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { siteConfig } from '../config/site'

export interface CartItem {
  productId: string
  qty: number
}

export interface CustomerInfo {
  name: string
  phone: string
  city: string
  address: string
  location: string
}

interface StoreContextValue {
  countryCode: string
  setCountryCode: (code: string) => void
  cart: CartItem[]
  addToCart: (productId: string, qty?: number) => void
  removeFromCart: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clearCart: () => void
  favorites: string[]
  toggleFavorite: (productId: string) => void
  cartCount: number
  customer: CustomerInfo
  setCustomer: (updates: Partial<CustomerInfo>) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [countryCode, setCountryCodeState] = useState<string>(() =>
    readJSON('lumira:country', siteConfig.defaultCountryCode),
  )
  const [cart, setCart] = useState<CartItem[]>(() => readJSON('lumira:cart', []))
  const [favorites, setFavorites] = useState<string[]>(() =>
    readJSON('lumira:favorites', []),
  )
  const [customer, setCustomerState] = useState<CustomerInfo>(() => ({
    name: '',
    phone: '',
    city: '',
    address: '',
    location: '',
    ...readJSON<Partial<CustomerInfo>>('lumira:customer', {}),
  }))

  useEffect(() => {
    localStorage.setItem('lumira:country', JSON.stringify(countryCode))
  }, [countryCode])

  useEffect(() => {
    localStorage.setItem('lumira:cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('lumira:favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('lumira:customer', JSON.stringify(customer))
  }, [customer])

  const setCountryCode = (code: string) => setCountryCodeState(code)

  const addToCart = (productId: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [...prev, { productId, qty }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId))
  }

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, qty } : i)),
    )
  }

  const clearCart = () => setCart([])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    )
  }

  const setCustomer = (updates: Partial<CustomerInfo>) => {
    setCustomerState((prev) => ({ ...prev, ...updates }))
  }

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart],
  )

  const value: StoreContextValue = {
    countryCode,
    setCountryCode,
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    favorites,
    toggleFavorite,
    cartCount,
    customer,
    setCustomer,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext)
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return ctx
}
