import type { StaticImageData } from 'next/image'
interface PaletteSwatch {
  background: string
  foreground: string
}

export interface Portfolio {
  title: string
  slug: string
  logo: StaticImageData
  image: StaticImageData
  palette: PaletteSwatch
  description: string
  timeframe: string
  website: string
}

export const PORTFOLIOS: Portfolio[] = [
  
]
