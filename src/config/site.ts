export interface Country {
  code: string
  name: string
  flag: string
  capital: string
  currencyCode: string
  currencySymbol: string
  currencyName: string
  rate: number
  deliveryFee: number
  freeDeliveryThreshold: number
  phonePrefix: string
  cities: string[]
}

export const siteConfig = {
  brandName: 'لوميـرا بيوتي',
  brandNameLatin: 'Lumira Beauty',
  tagline: 'جمالكِ يبدأ من الطبيعة',
  description:
    'مستحضرات عناية ومكياج طبيعية مختارة بعناية، لتمنح بشرتكِ وشعركِ عناية فاخرة في كل يوم.',
  whatsappNumber: '9647700800306',
  whatsappIntro: 'أود إتمام الطلب التالي:',
  email: 'hello@lumira-beauty.com',
  hours: 'السبت إلى الخميس: 9:00 ص – 8:00 م',
  social: {
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
    snapchat: 'https://snapchat.com/',
    facebook: 'https://facebook.com/',
  },
  defaultCountryCode: 'IQ',
  baseCurrencyName: 'دينار عراقي',
}

export const countries: Country[] = [
  {
    code: 'IQ',
    name: 'العراق',
    flag: '🇮🇶',
    capital: 'بغداد',
    currencyCode: 'IQD',
    currencySymbol: 'د.ع',
    currencyName: 'دينار عراقي',
    rate: 1750,
    deliveryFee: 5000,
    freeDeliveryThreshold: 50000,
    phonePrefix: '07XXXXXXXX',
    cities: [
      'بغداد',
      'البصرة',
      'نينوى',
      'أربيل',
      'النجف',
      'كربلاء',
      'الموصل',
      'الحلة',
      'الديوانية',
      'الكرادة',
      'العمارة',
      'الكوت',
      'بابل',
      'دهوك',
      'السليمانية',
      'كركوك',
      'ميسان',
      'صلاح الدين',
      'ديالى',
      'الأنبار',
      'القادسية',
      'المثنى',
      'واسط',
    ],
  },
]

export function getCountry(code: string): Country {
  return countries.find((c) => c.code === code) ?? countries[0]
}
