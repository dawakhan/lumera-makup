interface IconProps {
  size?: number
  filled?: boolean
}

function baseProps(size: number) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
}

export function IconCart({ size = 22 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <circle cx="9" cy="21" r="1.4" />
      <circle cx="19" cy="21" r="1.4" />
      <path d="M2 3h2.5l2.3 12.2a1.6 1.6 0 0 0 1.6 1.3h9.8a1.6 1.6 0 0 0 1.6-1.3L21.5 8H6" />
    </svg>
  )
}

export function IconHeart({ size = 22, filled = false }: IconProps) {
  return (
    <svg
      {...baseProps(size)}
      fill={filled ? 'currentColor' : 'none'}
    >
      <path d="M12 20.6C7.4 17 4 14 4 10.4 4 7.9 6 6 8.4 6c1.4 0 2.7.7 3.6 1.9C12.9 6.7 14.2 6 15.6 6 18 6 20 7.9 20 10.4c0 3.6-3.4 6.6-8 10.2Z" />
    </svg>
  )
}

export function IconSearch({ size = 22 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function IconWhatsApp({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.1.1.3 0 .4l-.4.6-.5.6c-.1.1-.3.3-.1.6.2.3.8 1.4 1.8 2.2 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2.1 1c.3.2.5.3.6.4 0 .2 0 .6-.1 1Z" />
    </svg>
  )
}

export function IconMenu({ size = 22 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

export function IconClose({ size = 22 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function IconStar({ size = 16, filled = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3 1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" />
    </svg>
  )
}

export function IconCheck({ size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  )
}

export function IconArrow({ size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="M19 12H5m6 6-6-6 6-6" />
    </svg>
  )
}

export function IconChevron({ size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function IconTruck({ size = 26 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="M2 5h12v11H2zM14 9h4l4 4v3h-8z" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </svg>
  )
}

export function IconSparkles({ size = 26 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.9 2.9M15.5 15.5l2.9 2.9M18.4 5.6l-2.9 2.9M8.5 15.5l-2.9 2.9" />
    </svg>
  )
}

export function IconShield({ size = 26 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="M12 2.5 4 5.5v6c0 4.8 3.4 8.4 8 10 4.6-1.6 8-5.2 8-10v-6l-8-3Z" />
      <path d="m8.5 12 2.4 2.4 4.6-4.8" />
    </svg>
  )
}

export function IconPhone({ size = 20 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="M4 5c0 8 7 15 15 15l2-4-4-2-2 2a13 13 0 0 1-7-7l2-2-2-4-4 2Z" />
    </svg>
  )
}

export function IconMail({ size = 20 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export function IconPin({ size = 20 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

export function IconClock({ size = 20 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function IconTrash({ size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="M4 7h16M9 7V5h6v2m3 0-1 14H7L6 7m4 4v6m4-6v6" />
    </svg>
  )
}

export function IconPlus({ size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function IconMinus({ size = 18 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <path d="M5 12h14" />
    </svg>
  )
}

export function IconUser({ size = 22 }: IconProps) {
  return (
    <svg {...baseProps(size)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" />
    </svg>
  )
}
