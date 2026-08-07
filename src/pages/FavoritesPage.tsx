import { Link } from 'react-router-dom'
import { products } from '../data/catalog'
import { useStore } from '../store/StoreContext'
import ProductCard from '../components/ProductCard'
import { IconHeart, IconArrow } from '../components/Icons'

export default function FavoritesPage() {
  const { favorites } = useStore()
  const favProducts = products.filter((p) => favorites.includes(p.id))

  return (
    <section className="section favorites-page">
      <div className="container">
        <div className="page-head">
          <div>
            <h1 className="page-title">المفضلة</h1>
            <p className="page-subtitle">
              {favProducts.length > 0
                ? `لديك ${favProducts.length} منتج في المفضلة`
                : 'احفظي منتجاتك المفضلة هنا'}
            </p>
          </div>
        </div>

        {favProducts.length === 0 ? (
          <div className="empty-state">
            <IconHeart size={56} />
            <h3>لا توجد منتجات في المفضلة</h3>
            <p>اضغطي على قلب المنتج لإضافته إلى مفضلتك</p>
            <Link to="/shop" className="btn btn-primary">
              تصفّحي المتجر
              <IconArrow size={16} />
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {favProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
