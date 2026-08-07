import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, products, getCategory } from '../data/catalog'
import { siteConfig, getCountry } from '../config/site'
import { useStore } from '../store/StoreContext'
import {
  img,
  formatPrice,
  toLocal,
  buildWhatsAppLink,
} from '../utils/format'
import ProductCard from '../components/ProductCard'
import CustomerForm, { isCustomerComplete } from '../components/CustomerForm'
import {
  IconHeart,
  IconCart,
  IconStar,
  IconCheck,
  IconWhatsApp,
  IconTruck,
  IconShield,
  IconSparkles,
  IconArrow,
} from '../components/Icons'

export default function ProductPage() {
  const { id } = useParams()
  const {
    countryCode,
    addToCart,
    favorites,
    toggleFavorite,
    customer,
  } = useStore()
  const country = getCountry(countryCode)
  const product = id ? getProduct(id) : undefined
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)
  const [formError, setFormError] = useState(false)

  const gallery = useMemo(() => {
    if (!product) return []
    return product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image]
  }, [product])

  if (!product) {
    return (
      <section className="section container">
        <div className="empty-state">
          <h3>المنتج غير موجود</h3>
          <Link to="/shop" className="btn btn-primary">
            العودة إلى المتجر
          </Link>
        </div>
      </section>
    )
  }

  const category = getCategory(product.category)
  const isFav = favorites.includes(product.id)
  const price = toLocal(product.price, country)
  const oldPrice = product.oldPrice ? toLocal(product.oldPrice, country) : null
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAdd = () => {
    addToCart(product.id, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  const waMessage = [
    `مرحباً ${siteConfig.brandName}`,
    `أرغب بطلب المنتج: ${product.name}`,
    `الحجم: ${product.size}`,
    `الكمية: ${qty}`,
    `السعر: ${formatPrice(toLocal(product.price * qty, country), country)}`,
    '',
    '--- بيانات الطلب ---',
    `الاسم: ${customer.name.trim()}`,
    `رقم الجوال: ${customer.phone.trim()}`,
    `الدولة: ${country.name}`,
    `المدينة: ${customer.city.trim()}`,
    `العنوان: ${customer.address.trim()}`,
    ...((customer.location || '').trim()
      ? [`موقع جوجل مابس: ${customer.location.trim()}`]
      : []),
  ].join('\n')

  const handleWhatsAppOrder = () => {
    if (!isCustomerComplete(customer)) {
      setFormError(true)
      return
    }
    setFormError(false)
    window.open(
      buildWhatsAppLink(siteConfig.whatsappNumber, waMessage),
      '_blank',
    )
  }

  const favoriteBtn = (
    <button
      type="button"
      className={`fav-btn ${isFav ? 'active' : ''}`}
      aria-label={isFav ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
      onClick={() => toggleFavorite(product.id)}
    >
      <IconHeart filled={isFav} size={22} />
    </button>
  )

  return (
    <>
      <section className="section product-page">
        <div className="container">
          <nav className="breadcrumbs" aria-label="مسار التنقل">
            <Link to="/">الرئيسية</Link>
            <span>/</span>
            <Link to="/shop">المتجر</Link>
            <span>/</span>
            {category && (
              <>
                <Link to={`/shop/${category.id}`}>{category.name}</Link>
                <span>/</span>
              </>
            )}
            <span className="current">{product.name}</span>
          </nav>

          <div className="product-layout">
            <div className="gallery">
              <div className="gallery-main">
                <img
                  src={img(gallery[activeImage])}
                  alt={product.name}
                  key={activeImage}
                />
                {product.badge && (
                  <span className={`product-badge badge-${product.badge}`}>
                    {product.badge === 'new' && 'جديد'}
                    {product.badge === 'sale' && 'تخفيض'}
                    {product.badge === 'bestseller' && 'الأكثر مبيعاً'}
                  </span>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="gallery-thumbs">
                  {gallery.map((g, i) => (
                    <button
                      type="button"
                      key={g}
                      className={i === activeImage ? 'thumb active' : 'thumb'}
                      onClick={() => setActiveImage(i)}
                      aria-label={`صورة ${i + 1}`}
                    >
                      <img src={img(g)} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="product-details">
              {category && (
                <Link to={`/shop/${category.id}`} className="detail-category">
                  {category.name}
                </Link>
              )}
              <h1 className="detail-title">{product.name}</h1>
              <div className="detail-rating">
                <span className="stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <IconStar key={n} size={16} filled={n <= Math.round(product.rating)} />
                  ))}
                </span>
                <span className="rating-num">
                  {product.rating} ({product.reviews} تقييم)
                </span>
                <span className="in-stock">
                  <IconCheck size={14} />
                  متوفر
                </span>
              </div>

              <p className="detail-desc">{product.shortDescription}</p>

              <div className="detail-price-row">
                <span className="detail-price">{formatPrice(price, country)}</span>
                {oldPrice && (
                  <span className="old-price">{formatPrice(oldPrice, country)}</span>
                )}
              </div>

              <div className="detail-size">
                <span className="size-label">الحجم:</span>
                <span className="size-value">{product.size}</span>
              </div>

              <div className="buy-row">
                <div className="qty-stepper">
                  <button
                    type="button"
                    onClick={() => setQty((v) => Math.max(1, v - 1))}
                    aria-label="إنقاص الكمية"
                  >
                    -
                  </button>
                  <span>{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((v) => v + 1)}
                    aria-label="زيادة الكمية"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className={`btn btn-primary btn-lg add-to-cart ${added ? 'added' : ''}`}
                  onClick={handleAdd}
                >
                  <IconCart size={20} />
                  {added ? 'تمت الإضافة' : 'أضيفي إلى السلة'}
                </button>
                {favoriteBtn}
              </div>

              <CustomerForm />

              {formError && (
                <p className="form-error">
                  لطفاً عبّئ جميع بيانات التوصيل (الاسم، الجوال، المدينة،
                  العنوان) لإتمام الطلب
                </p>
              )}

              <button
                type="button"
                className="btn btn-whatsapp btn-lg"
                onClick={handleWhatsAppOrder}
              >
                <IconWhatsApp size={20} />
                اطلبي عبر واتساب
              </button>

              <ul className="detail-perks">
                <li>
                  <IconTruck size={20} />
                  <span>شحن سريع لجميع أنحاء {country.name}</span>
                </li>
                <li>
                  <IconShield size={20} />
                  <span>الدفع عند الاستلام متاح</span>
                </li>
                <li>
                  <IconSparkles size={20} />
                  <span>منتجات طبيعية وآمنة للبشرة</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="detail-extra">
            <div className="detail-about">
              <h2>عن المنتج</h2>
              <p>{product.description}</p>
            </div>
            <div className="detail-features">
              <h2>المميزات</h2>
              <ul>
                {product.features.map((f) => (
                  <li key={f}>
                    <IconCheck size={16} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section related-section">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="section-eyebrow">منتجات مشابهة</span>
                <h2 className="section-title">قد يعجبكِ أيضاً</h2>
              </div>
              <Link to="/shop" className="link-more">
                عرض الكل
                <IconArrow size={16} />
              </Link>
            </div>
            <div className="product-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
