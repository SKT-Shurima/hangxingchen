import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { DM_Sans } from 'next/font/google'
import { Suspense } from 'react'
import { Background } from '~/components/background'
import { Footer } from '~/components/footer'
import { Rulers } from '~/components/rulers'
import { Sidebar } from '~/components/sidebar'
import { Toasts } from '~/components/toasts'
import { getOpenGraphImage } from '~/lib/helper'
import { PostHogPageview, PHProvider as PostHogProvider } from '../lib/posthog/posthog-provider'
import 'tailwindcss/tailwind.css'
import '~/app/globals.css'

const fontSansEn = DM_Sans({
  weight: ['400', '500', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans-en',
  fallback: ['ui-sans-serif'],
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#1c1917' },
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
  ],
}

export const metadata: Metadata = {
  title: {
    default: '杭星辰 - 星瑞车主社区',
    template: '%s | 杭星辰',
  },
  description: '杭星辰是一个充满热情与创意的星瑞车主社区，我们汇聚了众多热爱生活、热爱驾驶的车友。',
  keywords: '杭星辰,星瑞,车主社区,自驾游,摄影分享,技术交流',
  icons: {
    icon: '/assets/favicon-v2.ico',
    shortcut: '/assets/favicon-v2.ico',
    apple: '/assets/apple-touch-icon.png',
  },
  manifest: '/assets/site.webmanifest',
  openGraph: {
    title: {
      default: '杭星辰 - 星瑞车主社区',
      template: '%s | 杭星辰',
    },
    description: '杭星辰是一个充满热情与创意的星瑞车主社区，我们汇聚了众多热爱生活、热爱驾驶的车友。',
    siteName: '杭星辰 - 星瑞车主社区',
    locale: 'zh-CN',
    type: 'website',
    images: [getOpenGraphImage('杭星辰 - 星瑞车主社区', 'zh-CN')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    site: '@zolplay',
    creator: '@theSylvancastle',
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={`font-sans ${fontSansEn.variable}`}>
      <head>
        <script
          // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{
            __html: `${uwu.toString()};uwu()`,
          }}
        />
      </head>
      <Suspense>
        <PostHogPageview />
      </Suspense>

      <PostHogProvider>
        <body className='bg-stone-50 text-stone-800 dark:bg-stone-900 dark:text-stone-300'>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <Background />
            <main className='relative mx-2 flex min-h-screen max-w-4xl flex-col pt-12 md:mx-4 md:mt-0 md:flex-row md:pt-20 lg:mx-auto lg:pt-28'>
              <Rulers />
              <Sidebar />
              <section className='frosted-noise relative z-20 mt-3 flex w-full flex-auto flex-col border border-transparent bg-[#fefefe] p-5 pb-36 shadow-xl dark:border-stone-800 dark:bg-[#1a1a1a] md:mt-0 md:p-7 md:pb-36 lg:p-9 lg:pb-44'>
                <article className='prose dark:prose-invert prose-headings:tracking-tighter prose-h1:text-2xl prose-p:leading-loose prose-p:tracking-tight prose-li:tracking-tight prose-img:rounded-xl lg:prose-h1:text-4xl'>
                  {children}
                </article>

                <Footer />
              </section>
            </main>

            <Toasts />
          </ThemeProvider>
        </body>
      </PostHogProvider>
    </html>
  )
}

function uwu() {
  const query = new URLSearchParams(location.search)
  if (query?.has('uwu')) {
    if (query.get('uwu') === '0' || query.get('uwu') === 'false') {
      localStorage.removeItem('uwu')
    } else {
      localStorage.setItem('uwu', '1')
    }
  }
} 