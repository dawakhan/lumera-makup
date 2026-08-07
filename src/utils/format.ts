import type { Country } from '../config/site'

export function img(id: number | string): string {
  return `/images/${id}.jpg`
}

export function toLocal(base: number, country: Country): number {
  return base * country.rate
}

export function formatPrice(amount: number, country: Country): string {
  const digits = country.rate < 1 ? 3 : 2
  const value = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(amount)
  return `${value} ${country.currencySymbol}`
}

export function buildWhatsAppLink(
  number: string,
  text: string,
): string {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}
