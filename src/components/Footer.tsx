import { Link } from 'react-router-dom'
import { siteConfig, getCountry } from '../config/site'
import { useStore } from '../store/StoreContext'
import { categories } from '../data/catalog'
import { IconPhone, IconMail, IconPin, IconClock, IconWhatsApp } from './Icons'

const infoLinks = [
  { to: '/about', label: 'من نحن' },
  { to: '/contact', label: 'تواصل معنا' },
  { to: '/shipping', label: 'الشحن والتوصيل' },
  { to: '/privacy', label: 'سياسة الخصوصية' },
]

export default function Footer() {
  const { countryCode } = useStore()
  const country = getCountry(countryCode)
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand-col">
          <div className="brand footer-brand">
            <span className="brand-mark">ل</span>
            <span className="brand-text">
              <span className="brand-name">{siteConfig.brandName}</span>
              <span className="brand-latin">{siteConfig.brandNameLatin}</span>
            </span>
          </div>
          <p className="footer-about">{siteConfig.description}</p>
          <div className="social-row">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="انستغرام">
              انستغرام
            </a>
            <a href={siteConfig.social.tiktok} target="_blank" rel="noreferrer" aria-label="تيك توك">
              تيك توك
            </a>
            <a href={siteConfig.social.snapchat} target="_blank" rel="noreferrer" aria-label="سناب شات">
              سناب شات
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="فيسبوك">
              فيسبوك
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3 className="footer-title">الأقسام</h3>
          <ul className="footer-links">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/shop/${c.id}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-title">روابط</h3>
          <ul className="footer-links">
            {infoLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/shop">جميع المنتجات</Link>
            </li>
            <li>
              <Link to="/favorites">المفضلة</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-title">تواصلي معنا</h3>
          <ul className="footer-contact">
            <li>
              <IconPhone size={18} />
              <span dir="ltr">{siteConfig.whatsappNumber}</span>
            </li>
            <li>
              <IconMail size={18} />
              <span>{siteConfig.email}</span>
            </li>
            <li>
              <IconPin size={18} />
              <span>{country.capital}، {country.name}</span>
            </li>
            <li>
              <IconClock size={18} />
              <span>{siteConfig.hours}</span>
            </li>
            <li>
              <IconWhatsApp size={18} />
              <span>متاحة للرد عبر واتساب</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}. جميع الحقوق محفوظة.
          </p>
          <p>صُنع بحب لعشاق الجمال</p>
        </div>
      </div>
    </footer>
  )
}
