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
  whatsappNumber: '962788496859',
  whatsappIntro: 'أود إتمام الطلب التالي:',
  email: 'hello@lumira-beauty.com',
  hours: 'السبت إلى الخميس: 9:00 ص – 8:00 م',
  social: {
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
    snapchat: 'https://snapchat.com/',
    facebook: 'https://facebook.com/',
  },
  defaultCountryCode: 'JO',
  baseCurrencyName: 'دينار أردني',
}

export const countries: Country[] = [
  {
    code: 'JO',
    name: 'الأردن',
    flag: '🇯🇴',
    capital: 'عمّان',
    currencyCode: 'JOD',
    currencySymbol: 'د.أ',
    currencyName: 'دينار أردني',
    rate: 1,
    deliveryFee: 2.5,
    freeDeliveryThreshold: 25,
    phonePrefix: '07XXXXXXXX',
    cities: ['عمّان', 'إربد', 'الزرقاء', 'العقبة', 'السلط', 'مادبا', 'جرش', 'عجلون', 'الكرك'],
  },
  {
    code: 'SA',
    name: 'السعودية',
    flag: '🇸🇦',
    capital: 'الرياض',
    currencyCode: 'SAR',
    currencySymbol: 'ر.س',
    currencyName: 'ريال سعودي',
    rate: 5.32,
    deliveryFee: 30,
    freeDeliveryThreshold: 200,
    phonePrefix: '05XXXXXXXX',
    cities: ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة', 'الخبر', 'الطائف', 'أبها', 'تبوك'],
  },
  {
    code: 'AE',
    name: 'الإمارات',
    flag: '🇦🇪',
    capital: 'أبوظبي',
    currencyCode: 'AED',
    currencySymbol: 'د.إ',
    currencyName: 'درهم إماراتي',
    rate: 5.27,
    deliveryFee: 25,
    freeDeliveryThreshold: 200,
    phonePrefix: '05XXXXXXXX',
    cities: ['دبي', 'أبوظبي', 'الشارقة', 'العين', 'عجمان', 'رأس الخيمة', 'الفجيرة', 'أم القيوين'],
  },
  {
    code: 'KW',
    name: 'الكويت',
    flag: '🇰🇼',
    capital: 'مدينة الكويت',
    currencyCode: 'KWD',
    currencySymbol: 'د.ك',
    currencyName: 'دينار كويتي',
    rate: 0.46,
    deliveryFee: 2,
    freeDeliveryThreshold: 20,
    phonePrefix: '5XXXXXXX',
    cities: ['مدينة الكويت', 'حولي', 'السالمية', 'الفروانية', 'الجهراء', 'الأحمدي', 'صباح السالم'],
  },
  {
    code: 'QA',
    name: 'قطر',
    flag: '🇶🇦',
    capital: 'الدوحة',
    currencyCode: 'QAR',
    currencySymbol: 'ر.ق',
    currencyName: 'ريال قطري',
    rate: 5.23,
    deliveryFee: 25,
    freeDeliveryThreshold: 200,
    phonePrefix: '55XXXXXXX',
    cities: ['الدوحة', 'الريان', 'الوكرة', 'الخور', 'أم صلال', 'الشمال', 'مسيعيد'],
  },
  {
    code: 'BH',
    name: 'البحرين',
    flag: '🇧🇭',
    capital: 'المنامة',
    currencyCode: 'BHD',
    currencySymbol: 'د.ب',
    currencyName: 'دينار بحريني',
    rate: 0.54,
    deliveryFee: 2,
    freeDeliveryThreshold: 20,
    phonePrefix: '3XXXXXXX',
    cities: ['المنامة', 'المحرق', 'الرفاع', 'سترة', 'مدينة عيسى', 'جد حفص', 'الحد'],
  },
  {
    code: 'OM',
    name: 'عُمان',
    flag: '🇴🇲',
    capital: 'مسقط',
    currencyCode: 'OMR',
    currencySymbol: 'ر.ع',
    currencyName: 'ريال عماني',
    rate: 0.55,
    deliveryFee: 2,
    freeDeliveryThreshold: 20,
    phonePrefix: '9XXXXXXX',
    cities: ['مسقط', 'صلالة', 'صحار', 'نزوى', 'السيب', 'صور', 'عبري', 'شناص'],
  },
]

export function getCountry(code: string): Country {
  return countries.find((c) => c.code === code) ?? countries[0]
}
