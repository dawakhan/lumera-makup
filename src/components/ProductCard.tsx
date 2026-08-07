import { Link } from 'react-router-dom'
import { getCountry } from '../config/site'
import { useStore } from '../store/StoreContext'
import { img, formatPrice, toLocal } from '../utils/format'
import type { Product } from '../data/catalog'
import { IconHeart, IconCart, IconStar } from './Icons'

export default function ProductCard({ product }: { product: Product }) {
  const { countryCode, addToCart, favorites, toggleFavorite } = useStore()
  const country = getCountry(countryCode)
  const isFav = favorites.includes(product.id)
  const price = toLocal(product.price, country)
  const oldPrice = product.oldPrice ? toLocal(product.oldPrice, country) : null

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-media">
        <img src={img(product.image)} alt={product.name} loading="lazy" />
        {product.badge && (
          <span className={`product-badge badge-${product.badge}`}>
            {product.badge === 'new' && 'جديد'}
            {product.badge === 'sale' && 'تخفيض'}
            {product.badge === 'bestseller' && 'الأكثر مبيعاً'}
          </span>
        )}
        <button
          type="button"
          className={`fav-btn ${isFav ? 'active' : ''}`}
          aria-label={isFav ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite(product.id)
          }}
        >
          <IconHeart filled={isFav} size={20} />
        </button>
      </Link>

      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <p className="product-short">{product.shortDescription}</p>
        <div className="product-rating">
          <span className="stars" aria-label={`تقييم ${product.rating}`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <IconStar key={n} size={14} filled={n <= Math.round(product.rating)} />
            ))}
          </span>
          <span className="rating-num">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="product-foot">
          <div className="price-row">
            <span className="price">{formatPrice(price, country)}</span>
            {oldPrice && <span className="old-price">{formatPrice(oldPrice, country)}</span>}
          </div>
          <button
            type="button"
            className="add-btn"
            aria-label="أضيفي إلى السلة"
            onClick={(e) => {
              e.preventDefault()
              addToCart(product.id)
            }}
          >
            <IconCart size={18} />
          </button>
        </div>
      </div>
    </article>
  )
}
