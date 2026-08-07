import { siteConfig } from '../config/site'
import { buildWhatsAppLink } from '../utils/format'
import { IconWhatsApp } from './Icons'

export default function WhatsAppFab() {
  const message = `مرحباً ${siteConfig.brandName}، أود الاستفسار عن منتجاتكم.`

  return (
    <a
      href={buildWhatsAppLink(siteConfig.whatsappNumber, message)}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      aria-label="تواصل عبر واتساب"
    >
      <IconWhatsApp size={28} />
    </a>
  )
}
