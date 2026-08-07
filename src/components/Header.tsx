import { useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { siteConfig, countries, getCountry } from '../config/site'
import { useStore } from '../store/StoreContext'
import {
  IconCart,
  IconHeart,
  IconMenu,
  IconClose,
  IconSearch,
  IconTruck,
  IconChevron,
} from './Icons'

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/shop', label: 'المتجر' },
  { to: '/shop/skincare', label: 'العناية بالبشرة' },
  { to: '/shop/perfume', label: 'العطور' },
  { to: '/shop/gifts', label: 'الهدايا' },
  { to: '/about', label: 'من نحن' },
]

export default function Header() {
  const { countryCode, setCountryCode, cartCount, favorites } = useStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const country = getCountry(countryCode)

  const submitSearch = (e: FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
    setQuery('')
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="topbar">
        <div className="container topbar-inner">
          <p className="topbar-note">
            <IconTruck size={18} />
            <span>
              شحن مجاني للطلبات فوق{' '}
              {getCountry(countryCode).freeDeliveryThreshold}{' '}
              {getCountry(countryCode).currencySymbol} إلى{' '}
              {getCountry(countryCode).name}
            </span>
          </p>
          <p className="topbar-hours">{siteConfig.hours}</p>
        </div>
      </div>

      <div className="container header-main">
        <button
          type="button"
          className="icon-btn mobile-menu-btn"
          aria-label="القائمة"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>

        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">ل</span>
          <span className="brand-text">
            <span className="brand-name">{siteConfig.brandName}</span>
            <span className="brand-latin">{siteConfig.brandNameLatin}</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="التنقل الرئيسي">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <form className="search-box" onSubmit={submitSearch} role="search">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحثي عن منتج..."
              aria-label="البحث في المتجر"
            />
            <button type="submit" className="icon-btn" aria-label="بحث">
              <IconSearch size={20} />
            </button>
          </form>

          <div className="country-select">
            <button
              type="button"
              className="country-btn"
              onClick={() => setCountryOpen((v) => !v)}
              aria-haspopup="listbox"
            >
              <span className="flag">{country.flag}</span>
              <span className="country-code">{country.currencyCode}</span>
              <IconChevron size={14} />
            </button>
            {countryOpen && (
              <div className="country-dropdown" role="listbox">
                <p className="dropdown-title">اختر دولة التوصيل</p>
                {countries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    className={c.code === countryCode ? 'country-option active' : 'country-option'}
                    onClick={() => {
                      setCountryCode(c.code)
                      setCountryOpen(false)
                    }}
                  >
                    <span className="flag">{c.flag}</span>
                    <span className="country-name">{c.name}</span>
                    <span className="country-cur">{c.currencyCode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/favorites" className="icon-btn badge-btn" aria-label="المفضلة">
            <IconHeart />
            {favorites.length > 0 && (
              <span className="badge">{favorites.length}</span>
            )}
          </Link>

          <Link to="/cart" className="icon-btn badge-btn" aria-label="سلة التسوق">
            <IconCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="القائمة المتنقلة">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
              }
              onClick={() => setMenuOpen(false)}
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="mobile-nav-divider" />
          <p className="mobile-nav-label">الدولة</p>
          <div className="mobile-countries">
            {countries.map((c) => (
              <button
                key={c.code}
                type="button"
                className={c.code === countryCode ? 'country-option active' : 'country-option'}
                onClick={() => {
                  setCountryCode(c.code)
                  setMenuOpen(false)
                }}
              >
                <span className="flag">{c.flag}</span>
                <span className="country-name">{c.name}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
