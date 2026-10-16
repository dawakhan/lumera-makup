import type { Country } from '../config/site'

export function img(id: number | string): string {
  return `/images/${id}.jpg`
}

export function toLocal(base: number, country: Country): number {
  return base * country.rate
}

export function formatPrice(amount: number, country: Country): string {
  const value = Math.round(amount)
  return `${value} ${country.currencySymbol}`
}

export function buildWhatsAppLink(
  number: string,
  text: string,
): string {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}
