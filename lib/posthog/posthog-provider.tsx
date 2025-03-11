'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect, useMemo } from 'react'

export function PostHogPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // Track pageviews
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = `${url}?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams])
  return <></>
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  // Use useMemo to prevent creating a new object on every render
  const memoizedClient = useMemo(() => posthog, [])
  return <PostHogProvider client={memoizedClient}>{children}</PostHogProvider>
}
