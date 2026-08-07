import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { categories, products, getCategory } from '../data/catalog'
import { img } from '../utils/format'
import ProductCard from '../components/ProductCard'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating'

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'المميز' },
  { value: 'price-asc', label: 'السعر: من الأقل' },
  { value: 'price-desc', label: 'السعر: من الأعلى' },
  { value: 'rating', label: 'الأعلى تقييماً' },
]

export default function ShopPage() {
  const { categoryId } = useParams()
  const [searchParams] = useSearchParams()
  const q = (searchParams.get('q') ?? '').trim()
  const [sort, setSort] = useState<SortKey>('featured')

  const activeCategory = categoryId ? getCategory(categoryId) : undefined

  const list = useMemo(() => {
    let result = [...products]
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory.id)
    }
    if (q) {
      const needle = q.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.shortDescription.toLowerCase().includes(needle),
      )
    }
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    return result
  }, [activeCategory, q, sort])

  const title = activeCategory
    ? activeCategory.name
    : q
      ? `نتائج البحث عن "${q}"`
      : 'جميع المنتجات'

  return (
    <section className="section shop-page">
      <div className="container">
        <div className="page-head">
          <div>
            <h1 className="page-title">{title}</h1>
            <p className="page-subtitle">
              {activeCategory
                ? activeCategory.description
                : q
                  ? `${list.length} منتج مطابق لبحثك`
                  : `تشكيلة مختارة من ${products.length} منتجاً بعناية`}
            </p>
          </div>
          <div className="sort-box">
            <label htmlFor="sort">ترتيب حسب</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="category-chips">
          <Link to="/shop" className={!categoryId ? 'chip active' : 'chip'}>
            الكل
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/shop/${c.id}`}
              className={categoryId === c.id ? 'chip active' : 'chip'}
            >
              {c.shortName}
            </Link>
          ))}
        </div>

        {activeCategory && (
          <div className="category-banner">
            <img src={img(activeCategory.image)} alt={activeCategory.name} />
            <div className="category-banner-copy">
              <h2>{activeCategory.name}</h2>
              <p>{activeCategory.description}</p>
            </div>
          </div>
        )}

        {list.length === 0 ? (
          <div className="empty-state">
            <h3>لا توجد منتجات مطابقة</h3>
            <p>جربي كلمات بحث أخرى أو تصفّحي جميع الأقسام</p>
            <Link to="/shop" className="btn btn-primary">
              تصفح المتجر
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
