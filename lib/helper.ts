export function getOpenGraphImage(title: string, locale?: string, subtitle?: string, image?: string) {
  const ogUrl = 'https://og.hxc.cc'

  // If the OG URL is not set, return a default image object
  if (!ogUrl) {
    return {
      url: '/assets/default-og-image.png', // Fallback to a static image
      width: 1200,
      height: 630,
    }
  }

  const url = new URL(ogUrl)
  url.searchParams.set('title', title)
  url.searchParams.set('locale', 'zh-CN')
  if (subtitle) {
    url.searchParams.set('subtitle', subtitle)
  }
  if (image) {
    url.searchParams.set('image', image)
  }

  return {
    url: url.toString(),
    width: 1200,
    height: 630,
  }
}
