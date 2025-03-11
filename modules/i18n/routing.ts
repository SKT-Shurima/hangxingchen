import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['zh-CN'],

  // Used when no locale matches
  defaultLocale: 'zh-CN',

  // Set to 'never' to disable locale prefixes in URLs
  localePrefix: 'never',
})

export type Locale = (typeof routing.locales)[number]
