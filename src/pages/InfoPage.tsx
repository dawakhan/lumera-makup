import { Link } from 'react-router-dom'
import { siteConfig, getCountry } from '../config/site'
import { useStore } from '../store/StoreContext'
import { buildWhatsAppLink } from '../utils/format'
import {
  IconWhatsApp,
  IconPhone,
  IconMail,
  IconPin,
  IconClock,
  IconTruck,
  IconShield,
} from '../components/Icons'

export type InfoPageKey = 'about' | 'contact' | 'shipping' | 'privacy'

interface InfoPageDef {
  key: InfoPageKey
  title: string
  subtitle: string
  sections: { heading?: string; paragraphs: string[] }[]
}

const pages: Record<InfoPageKey, InfoPageDef> = {
  about: {
    key: 'about',
    title: 'من نحن',
    subtitle: 'قصة لوميـرا بيوتي',
    sections: [
      {
        paragraphs: [
          `${siteConfig.brandName} علامة متخصصة في مستحضرات العناية بالبشرة والشعر والمكياج الطبيعي، نختار منتجاتنا بعناية فائقة لنقدم لكِ عناية فاخرة تلائم بشرتكِ العربية وذوقكِ الرفيع.`,
          'نؤمن أن الجمال الحقيقي يبدأ من العناية، لذلك نحرص على تقديم تشكيلة منتقاة من المنتجات الطبيعية الآمنة بأسعار معقولة، مع خدمة توصيل سريعة تغطي 7 دول عربية.',
          'فريقنا جاهز لمساعدتكِ في اختيار ما يناسبك عبر واتساب، لأن راحتكِ وسعادتكِ هما هدفنا الأول.',
        ],
      },
    ],
  },
  contact: {
    key: 'contact',
    title: 'تواصل معنا',
    subtitle: 'يسعدنا سماعكِ دائماً',
    sections: [
      {
        paragraphs: [
          'فريقنا متاح للرد على استفساراتكِ وطلباتكِ طوال أيام العمل عبر واتساب أو البريد الإلكتروني.',
        ],
      },
    ],
  },
  shipping: {
    key: 'shipping',
    title: 'الشحن والتوصيل',
    subtitle: 'كيف نصل إليكِ',
    sections: [
      {
        heading: 'مدة التوصيل',
        paragraphs: [
          'نشحن طلبكِ خلال 1-3 أيام عمل، وتصل الطلبات خلال 2-5 أيام حسب الدولة والمنطقة.',
        ],
      },
      {
        heading: 'رسوم الشحن',
        paragraphs: [
          'رسوم الشحن تختلف حسب الدولة، وتكون الشحنات مجانية للطلبات التي تتجاوز حد الشحن المجاني المحدد لكل دولة (تظهر التفاصيل في المتجر حسب اختياركِ لدولة التوصيل).',
        ],
      },
      {
        heading: 'الدفع عند الاستلام',
        paragraphs: [
          'نوفر خيار الدفع عند الاستلام في معظم الدول المشمولة بخدمتنا، مع إمكانية التأكيد النهائي عبر واتساب.',
        ],
      },
    ],
  },
  privacy: {
    key: 'privacy',
    title: 'سياسة الخصوصية',
    subtitle: 'خصوصيتكِ تهمنا',
    sections: [
      {
        paragraphs: [
          'نحترم خصوصيتكِ ونلتزم بحماية بياناتكِ الشخصية. تُستخدم معلومات التواصل التي تشاركينها معنا عبر واتساب أو البريد الإلكتروني لأغراض معالجة طلباتكِ والرد على استفساراتكِ فقط.',
          'لا نشارك بياناتكِ مع أي طرف ثالث، ولا نحتفظ بها إلا بالقدر اللازم لإتمام خدماتنا.',
        ],
      },
    ],
  },
}

const contactRows = [
  { icon: IconPhone, label: 'واتساب', value: siteConfig.whatsappNumber, ltr: true },
  { icon: IconMail, label: 'البريد الإلكتروني', value: siteConfig.email },
  { icon: IconClock, label: 'ساعات العمل', value: siteConfig.hours },
]

export default function InfoPage({ pageKey }: { pageKey: InfoPageKey }) {
  const page = pages[pageKey]
  const { countryCode } = useStore()
  const country = getCountry(countryCode)
  const contactRowsFull = [
    ...contactRows,
    { icon: IconPin, label: 'العنوان', value: `${country.capital}، ${country.name}` },
  ]

  return (
    <section className="section info-page">
      <div className="container narrow">
        <div className="page-head center">
          <h1 className="page-title">{page.title}</h1>
          <p className="page-subtitle">{page.subtitle}</p>
        </div>

        {pageKey === 'contact' && (
          <div className="contact-cards">
            {contactRowsFull.map((row) => (
              <div className="contact-card" key={row.label}>
                <row.icon size={24} />
                <span>{row.label}</span>
                <strong dir={row.ltr ? 'ltr' : undefined}>{row.value}</strong>
              </div>
            ))}
          </div>
        )}

        {pageKey === 'about' && (
          <div className="about-cta">
            <p>لا تترددي في سؤالنا عن أي منتج أو استخدام</p>
            <a
              href={buildWhatsAppLink(siteConfig.whatsappNumber, `مرحباً ${siteConfig.brandName}، لدي استفسار.`)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <IconWhatsApp size={20} />
              تحدثي معنا الآن
            </a>
          </div>
        )}

        {pageKey === 'shipping' && (
          <div className="info-icons">
            <div>
              <IconTruck size={30} />
              <strong>توصيل سريع</strong>
            </div>
            <div>
              <IconShield size={30} />
              <strong>دفع آمن</strong>
            </div>
          </div>
        )}

        {page.sections.map((section, i) => (
          <div className="info-section" key={i}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </div>
        ))}

        <div className="info-back">
          <Link to="/shop" className="btn btn-primary">
            تصفّحي المتجر
          </Link>
        </div>
      </div>
    </section>
  )
}
