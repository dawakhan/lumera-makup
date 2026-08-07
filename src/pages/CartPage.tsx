import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getProduct, getCategory } from '../data/catalog'
import { siteConfig, getCountry } from '../config/site'
import { useStore } from '../store/StoreContext'
import {
  img,
  formatPrice,
  toLocal,
  buildWhatsAppLink,
} from '../utils/format'
import {
  IconTrash,
  IconWhatsApp,
  IconCart,
  IconArrow,
  IconTruck,
} from '../components/Icons'
import CustomerForm, { isCustomerComplete } from '../components/CustomerForm'

export default function CartPage() {
  const {
    countryCode,
    cart,
    updateQty,
    removeFromCart,
    clearCart,
    customer,
  } = useStore()
  const country = getCountry(countryCode)
  const [formError, setFormError] = useState(false)

  const items = cart
    .map((item) => ({ item, product: getProduct(item.productId) }))
    .filter((entry): entry is { item: { productId: string; qty: number }; product: NonNullable<ReturnType<typeof getProduct>> } => Boolean(entry.product))

  const subtotal = items.reduce(
    (sum, { item, product }) => sum + product.price * item.qty,
    0,
  )
  const subtotalLocal = toLocal(subtotal, country)
  const threshold = country.freeDeliveryThreshold
  const freeDelivery = subtotalLocal >= threshold
  const delivery = items.length === 0 ? 0 : freeDelivery ? 0 : country.deliveryFee
  const remaining = threshold - subtotalLocal
  const total = subtotalLocal + delivery

  const orderMessage = [
    `مرحباً ${siteConfig.brandName}، ${siteConfig.whatsappIntro}`,
    '',
    ...items.map(({ item, product }, i) => {
      const lineTotal = toLocal(product.price * item.qty, country)
      return `${i + 1}- ${product.name} (×${item.qty}) — ${formatPrice(lineTotal, country)}`
    }),
    '',
    `المجموع الفرعي: ${formatPrice(subtotalLocal, country)}`,
    `التوصيل: ${freeDelivery ? 'مجاني' : formatPrice(delivery, country)}`,
    `الإجمالي: ${formatPrice(total, country)}`,
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

  const handleCheckout = () => {
    if (!isCustomerComplete(customer)) {
      setFormError(true)
      return
    }
    setFormError(false)
    window.open(
      buildWhatsAppLink(siteConfig.whatsappNumber, orderMessage),
      '_blank',
    )
  }

  return (
    <section className="section cart-page">
      <div className="container">
        <div className="page-head">
          <div>
            <h1 className="page-title">سلة التسوق</h1>
            <p className="page-subtitle">راجعي طلبك ثم أكمليه عبر واتساب</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <IconCart size={56} />
            <h3>سلتك فارغة</h3>
            <p>اكتشفي منتجاتنا وأضيفي ما يعجبكِ</p>
            <Link to="/shop" className="btn btn-primary">
              تسوّقي الآن
              <IconArrow size={16} />
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map(({ item, product }) => (
                <div className="cart-row" key={product.id}>
                  <Link to={`/product/${product.id}`} className="cart-thumb">
                    <img src={img(product.image)} alt={product.name} />
                  </Link>
                  <div className="cart-info">
                    <Link to={`/product/${product.id}`} className="cart-name">
                      {product.name}
                    </Link>
                    <span className="cart-size">
                      {product.size} • {getCategory(product.category)?.shortName ?? product.category}
                    </span>
                    <div className="cart-line-price">
                      {formatPrice(toLocal(product.price, country), country)}
                    </div>
                  </div>
                  <div className="cart-controls">
                    <div className="qty-stepper">
                      <button
                        type="button"
                        onClick={() => updateQty(product.id, item.qty - 1)}
                        aria-label="إنقاص الكمية"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(product.id, item.qty + 1)}
                        aria-label="زيادة الكمية"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="icon-btn remove-btn"
                      aria-label="حذف من السلة"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <IconTrash />
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={clearCart}
                >
                  إفراغ السلة
                </button>
                <Link to="/shop" className="link-more">
                  متابعة التسوق
                  <IconArrow size={16} />
                </Link>
              </div>
            </div>

            <aside className="order-summary">
              <h2>ملخص الطلب</h2>
              <div className="summary-row">
                <span>عدد المنتجات</span>
                <span>{items.length}</span>
              </div>
              <div className="summary-row">
                <span>المجموع الفرعي</span>
                <span>{formatPrice(subtotalLocal, country)}</span>
              </div>
              <div className="summary-row">
                <span>التوصيل</span>
                <span>
                  {freeDelivery ? (
                    <span className="free">مجاني</span>
                  ) : (
                    formatPrice(delivery, country)
                  )}
                </span>
              </div>
              {!freeDelivery && items.length > 0 && (
                <p className="delivery-note">
                  <IconTruck size={16} />
                  أضيفي منتجات بقيمة {formatPrice(remaining, country)} للحصول على
                  شحن مجاني
                </p>
              )}
              <div className="summary-total">
                <span>الإجمالي</span>
                <strong>{formatPrice(total, country)}</strong>
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
                className="btn btn-whatsapp btn-lg checkout-btn"
                onClick={handleCheckout}
              >
                <IconWhatsApp size={22} />
                إتمام الطلب عبر واتساب
              </button>
              <p className="checkout-note">
                عند الضغط سيتم فتح واتساب مع تفاصيل طلبك جاهزة، فقط اضغطي إرسال.
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}
