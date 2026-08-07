import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="section notfound-page">
      <div className="container narrow center-text">
        <h1 className="page-title">404</h1>
        <h2 className="notfound-title">الصفحة غير موجودة</h2>
        <p className="page-subtitle">
          يبدو أنكِ وصلتِ إلى رابط غير صحيح
        </p>
        <Link to="/" className="btn btn-primary">
          العودة إلى الرئيسية
        </Link>
      </div>
    </section>
  )
}
