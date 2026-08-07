import { Link } from 'react-router-dom'
import { siteConfig, getCountry } from '../config/site'
import { categories, products, testimonials, banners } from '../data/catalog'
import { useStore } from '../store/StoreContext'
import { img, formatPrice, toLocal } from '../utils/format'
import ProductCard from '../components/ProductCard'
import {
  IconTruck,
  IconSparkles,
  IconShield,
  IconWhatsApp,
  IconStar,
  IconArrow,
} from '../components/Icons'

const trustItems = [
  { icon: IconTruck, title: 'شحن سريع', text: (name: string) => `توصيل لجميع أنحاء ${name} خلال أيام` },
  { icon: IconSparkles, title: 'منتجات طبيعية', text: () => 'مستحضرات مختارة بعناية لبشرتكِ' },
  { icon: IconShield, title: 'دفع عند الاستلام', text: () => 'ادفعي بأمان عند وصول طلبك' },
  { icon: IconWhatsApp, title: 'دعم عبر واتساب', text: () => 'فريقنا جاهز للرد على استفساراتك' },
]

export default function HomePage() {
  const { countryCode } = useStore()
  const country = getCountry(countryCode)
  const featured = products.filter((p) => p.badge === 'bestseller').slice(0, 8)

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-eyebrow">{siteConfig.tagline}</span>
            <h1 className="hero-title">
              جمالكِ الطبيعي
              <br />
              <span className="accent">يبدأ من هنا</span>
            </h1>
            <p className="hero-text">{siteConfig.description}</p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary btn-lg">
                تسوّقي الآن
                <IconArrow size={18} />
              </Link>
              <Link to="/shop/gifts" className="btn btn-outline btn-lg">
                مجموعات الهدايا
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>+5000</strong>
                <span>عميلة سعيدة</span>
              </div>
              <div className="hero-stat">
                <strong>+120</strong>
                <span>منتجاً متميزاً</span>
              </div>
              <div className="hero-stat">
                <strong>7</strong>
                <span>دول نخدمها</span>
              </div>
            </div>
          </div>
          <div className="hero-media">
            <img src={img(29675494)} alt="سيروم فيتامين C المشرّق" />
            <div className="hero-card">
              <span className="hero-card-label">الأكثر طلباً</span>
              <strong>سيروم فيتامين C</strong>
              <span>{formatPrice(toLocal(9.5, country), country)}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-bar">
        <div className="container trust-grid">
          {trustItems.map((t) => (
            <div className="trust-item" key={t.title}>
              <t.icon size={30} />
              <div>
                <strong>{t.title}</strong>
                <span>{t.text(country.name)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section categories-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">تسوّقي حسب القسم</span>
              <h2 className="section-title">اكتشفي أقسامنا</h2>
            </div>
            <Link to="/shop" className="link-more">
              عرض الكل
              <IconArrow size={16} />
            </Link>
          </div>
          <div className="categories-grid">
            {categories.map((c) => (
              <Link to={`/shop/${c.id}`} className="category-card" key={c.id}>
                <img src={img(c.image)} alt={c.name} loading="lazy" />
                <div className="category-overlay">
                  <h3>{c.name}</h3>
                  <span>{c.description}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section banner-section">
        <div className="container">
          {banners.slice(0, 1).map((b) => (
            <div className="wide-banner" key={b.id}>
              <img src={img(b.image)} alt={b.title} />
              <div className="wide-banner-copy">
                <span className="section-eyebrow">{b.subtitle}</span>
                <h2>{b.title}</h2>
                <Link to={b.link} className="btn btn-primary">
                  {b.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-eyebrow">اختياراتنا لكِ</span>
              <h2 className="section-title">الأكثر مبيعاً</h2>
            </div>
            <Link to="/shop" className="link-more">
              عرض الكل
              <IconArrow size={16} />
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section promo-grid-section">
        <div className="container">
          <div className="promo-grid">
            {banners.slice(1).map((b) => (
              <div className="promo-card" key={b.id}>
                <img src={img(b.image)} alt={b.title} loading="lazy" />
                <div className="promo-copy">
                  <h3>{b.title}</h3>
                  <p>{b.subtitle}</p>
                  <Link to={b.link} className="link-more light">
                    {b.cta}
                    <IconArrow size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <div className="section-head center">
            <div>
              <span className="section-eyebrow">آراء عميلاتنا</span>
              <h2 className="section-title">ماذا قلن عنا</h2>
            </div>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="testimonial-stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <IconStar key={n} size={16} filled={n <= t.rating} />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <span className="avatar">{t.name.charAt(0)}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
