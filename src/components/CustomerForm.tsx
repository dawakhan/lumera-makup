import { useEffect } from 'react'
import { useStore, type CustomerInfo } from '../store/StoreContext'
import { getCountry } from '../config/site'

export function isCustomerComplete(customer: CustomerInfo): boolean {
  return Boolean(
    customer.name.trim() &&
      customer.phone.trim() &&
      customer.city.trim() &&
      customer.address.trim(),
  )
}

export default function CustomerForm() {
  const { customer, setCustomer, countryCode } = useStore()
  const country = getCountry(countryCode)

  useEffect(() => {
    if (customer.city && !country.cities.includes(customer.city)) {
      setCustomer({ city: '' })
    }
  }, [countryCode, country.cities, customer.city, setCustomer])

  return (
    <div className="customer-form">
      <h3>بيانات التوصيل</h3>
      <p className="customer-form-note">
        لطفاً عبّئ بياناتك لإتمام الطلب عبر واتساب
      </p>

      <label className="field">
        <span>الاسم الكامل *</span>
        <input
          type="text"
          value={customer.name}
          onChange={(e) => setCustomer({ name: e.target.value })}
          placeholder="مثال: سارة أحمد"
        />
      </label>

      <label className="field">
        <span>رقم الجوال *</span>
        <input
          type="tel"
          dir="ltr"
          value={customer.phone}
          onChange={(e) => setCustomer({ phone: e.target.value })}
          placeholder={country.phonePrefix}
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span>الدولة</span>
          <input type="text" value={country.name} readOnly disabled />
        </label>
        <label className="field">
          <span>المدينة *</span>
          <select
            value={customer.city}
            onChange={(e) => setCustomer({ city: e.target.value })}
          >
            <option value="" disabled>
              اختاري مدينتك
            </option>
            {country.cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field">
        <span>العنوان بالتفصيل *</span>
        <textarea
          rows={3}
          value={customer.address}
          onChange={(e) => setCustomer({ address: e.target.value })}
          placeholder="الحي، الشارع، أقرب نقطة دلالية..."
        />
      </label>

      <label className="field">
        <span>موقعك على جوجل مابس (اختياري)</span>
        <input
          type="url"
          dir="ltr"
          value={customer.location}
          onChange={(e) => setCustomer({ location: e.target.value })}
          placeholder="https://maps.app.goo.gl/..."
        />
      </label>
    </div>
  )
}
