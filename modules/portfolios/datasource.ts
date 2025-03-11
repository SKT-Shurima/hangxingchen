import type { StaticImageData } from 'next/image'
import downwordlyImage from './images/downwordly-image.png'
import downwordlyLogo from './images/downwordly-logo.webp'
import nexusImage from './images/nexus-image.png'
import nexusLogo from './images/nexus-logo.png'
import vvsImage from './images/vvs-image.gif'
import vvsLogo from './images/vvs-logo.png'

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
  {
    title: 'Live Aware - 下一代游戏开发者SaaS平台',
    slug: 'nexus',
    website: 'https://liveaware.io',
    logo: nexusLogo,
    image: nexusImage,
    palette: {
      background: '#030115',
      foreground: '#eeeeee',
    },
    description: '一个帮助游戏开发者更快打造出优秀游戏的 SaaS 平台。杭星辰很自豪地领导着产品开发和所有设计工作，以确保 Live Aware 达到最出色的水准。',
    timeframe: '2021 - now',
  },

  {
    title: 'VVS - 游戏公司官网',
    slug: 'vvs-website',
    website: 'https://vvspaceship.website',
    logo: vvsLogo,
    image: vvsImage,
    palette: {
      background: '#e3691a',
      foreground: '#fff',
    },
    description: 'very very spaceship 是西雅图的一家游戏开发公司，杭星辰负责开发与迭代更新他们的官网，同时帮助了他们进行官网的数字转型与优化了~10倍以上的访问速度与性能指标。',
    timeframe: '2020 - 2023',
  },

  {
    title: 'Downwordly - 拼字游戏官网',
    slug: 'downwordly',
    palette: {
      background: '#1657FF',
      foreground: '#fff',
    },
    description: 'Downwordly 是一个由 Bird Cartel 开发的英语拼词游戏，你需要充分利用手中的字母去拼凑成词汇，杭星辰负责帮助 Bird Cartel 打造开发了一个 3D 版官方网站。',
    timeframe: '2021',
    website: 'https://downwordly.com',
    logo: downwordlyLogo,
    image: downwordlyImage,
  },
]
