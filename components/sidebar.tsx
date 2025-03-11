'use client'

import type { ComponentProps } from '@zolplay/react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { clsxm } from '@zolplay/utils'
import { motion, useScroll, useTransform } from 'motion/react'

import Image from 'next/image'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaCar } from 'react-icons/fa6'
import { FiHome } from 'react-icons/fi'
import { GrUserAdd } from 'react-icons/gr'

import { LuPartyPopper } from 'react-icons/lu'
import { XiaohongshuIcon } from '~/components/icons/XiaohongshuIcon'
import { ThemeSelector } from '~/components/theme-selector'
import { Clock } from '~/components/ui/clock'
import logo_jpg from '~/public/assets/logo.jpg'

const links = [
  { href: '/', label: '首页', icon: FiHome },
  { href: '/about', label: '关于杭星辰', icon: FaCar },
  { href: '/portfolios', label: '往届活动', icon: LuPartyPopper },
  // { href: '/services', label: 'Services', icon: TbAugmentedReality2 },
  { href: '/join-us', label: '加入我们', icon: GrUserAdd },
  {
    href: 'https://www.xiaohongshu.com/user/profile/5c3dadf0000000000502e8c4',
    label: '小红书',
    icon: XiaohongshuIcon,
  },
]

export function Sidebar({ className }: { className?: string }) {
  const { scrollY } = useScroll()
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  // Update scrolled state based on scroll position
  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 50)
    }

    updateScrolled() // Initialize on mount
    window.addEventListener('scroll', updateScrolled)
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  // Logo size transforms based on scroll position (only on mobile)
  const logoSize = useTransform(scrollY, [0, 100], isMobile ? ['4rem', '2.5rem'] : ['7rem', '7rem'])

  return (
    <aside className={clsxm('md:mx-0 md:w-44 md:flex-shrink-0 md:px-0', className)}>
      <motion.div
        className='rounded-xl border border-yellow-500/10 bg-gradient-to-b from-yellow-500/5 to-indigo-500/5 p-4 shadow-md backdrop-blur-sm dark:border-amber-200/10 dark:from-amber-200/5 dark:to-sky-400/5 dark:shadow-stone-950/20 md:sticky md:top-12 md:pr-4'
        layout
        layoutRoot
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className='flex flex-col items-center md:items-start'>
          <motion.div
            className={clsxm(
              'flex w-full justify-center transition-all duration-300 md:justify-start',
              scrolled && isMobile
                ? 'fixed left-0 right-0 top-0 z-50 bg-white/80 pb-2 pt-2 shadow-md backdrop-blur-md dark:bg-stone-900/80'
                : '',
            )}
          >
            <NextLink
              href='/'
              aria-label='杭星辰 - 星瑞车主社区'
              className='group relative mb-3 inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-200 dark:focus-visible:ring-stone-700 dark:focus-visible:ring-offset-stone-800 md:mb-6'
            >
              <motion.div
                style={{ width: logoSize, height: logoSize }}
                className={clsxm(
                  'flex items-center justify-center overflow-hidden rounded-full border-2 border-stone-200 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-stone-700',
                  scrolled && isMobile ? 'bg-white/80 backdrop-blur-sm dark:bg-stone-900/80' : '',
                )}
                whileHover={{
                  boxShadow: '0 0 15px rgba(234, 179, 8, 0.6)',
                  borderColor: 'rgba(234, 179, 8, 0.6)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(234, 179, 8, 0)',
                    '0 0 10px rgba(234, 179, 8, 0.3)',
                    '0 0 0px rgba(234, 179, 8, 0)',
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
              >
                <Image
                  className='h-full w-full object-cover'
                  src={logo_jpg}
                  alt='杭星辰 - 星瑞车主社区'
                  width={120}
                  height={120}
                />
              </motion.div>
            </NextLink>
          </motion.div>

          <div className={clsxm('w-full', scrolled && isMobile ? 'mb-16 mt-16' : '')}>
            <NavMenu scrolled={scrolled} isMobile={isMobile} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.2,
            }}
            className='w-full'
          >
            <Separator />
          </motion.div>

          <motion.div
            className='relative z-30 flex w-full flex-col items-center gap-2 md:h-24 md:flex-col md:items-start'
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              delay: 0.1,
            }}
          >
            <div className='w-full max-w-[200px] rounded-lg border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-indigo-500/10 p-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-amber-200/10 dark:from-amber-200/5 dark:to-sky-400/5 md:w-full md:max-w-none'>
              <ThemeSelector />
            </div>
            <div className='w-full max-w-[200px] rounded-lg border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-indigo-500/10 p-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-amber-200/10 dark:from-amber-200/5 dark:to-sky-400/5 md:w-full md:max-w-none'>
              <Clock />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </aside>
  )
}

function Separator() {
  return (
    <div className='pointer-events-none mx-2 my-2 hidden h-px bg-gradient-to-r from-yellow-500/30 via-indigo-500/50 to-yellow-500/30 dark:from-amber-200/20 dark:via-sky-400/40 dark:to-amber-200/20 md:block' />
  )
}

function NavMenu({ scrolled, isMobile }: { scrolled?: boolean; isMobile?: boolean }) {
  return (
    <NavigationMenu.Root
      className={clsxm(
        'relative z-40 mt-4 w-full md:-ml-4 md:ml-0 md:mt-0',
        scrolled && isMobile
          ? 'fixed left-0 right-0 top-[3.5rem] bg-white/80 py-2 shadow-sm backdrop-blur-md dark:bg-stone-900/80'
          : '',
      )}
      orientation='vertical'
    >
      <NavigationMenu.List className='m-0 flex flex-wrap items-center justify-center gap-2 px-2 py-3 md:scroll-p-0 md:flex-col md:items-start md:justify-start md:overflow-visible md:px-0 md:py-0'>
        {links.map(({ href, label, icon: Icon }) => (
          <MenuLink key={label} href={href} label={label}>
            <Icon className='h-5 w-5 stroke-current' />
            <span>{label}</span>
          </MenuLink>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

function MenuLink({
  ref: forwardedRef,
  className,
  children,
  href,
  label,
}: ComponentProps<{ href: string; label?: string }> & { ref?: React.RefObject<HTMLAnchorElement | null> }) {
  const pathname = usePathname()
  const isActive = href === pathname
  const isExternal = href.startsWith('http')
  const LinkComponent = isExternal ? 'a' : NextLink

  return (
    <li className='flex justify-center md:justify-start'>
      <NavigationMenu.Link active={isActive} asChild>
        <LinkComponent
          href={href}
          onClick={() => {
            // @see https://github.com/framer/motion/issues/2006#issuecomment-1477824846
            window.scroll(0, 0)
          }}
          className={clsxm(
            'relative inline-flex select-none p-2 font-bold leading-none text-stone-400 no-underline outline-none transition-all duration-300 hover:text-stone-800 dark:text-stone-500 dark:hover:text-stone-100',
            'rounded-lg focus-visible:outline-stone-300 dark:focus-visible:outline-stone-700',
            'hover:scale-105 hover:shadow-md dark:hover:shadow-stone-800/30',
            isActive ? 'text-amber-50' : 'data-[active]:text-stone-900 dark:data-[active]:text-stone-50',
            className,
          )}
          aria-label={label}
          ref={forwardedRef}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {isActive && (
            <motion.span
              className='absolute inset-0 rounded-xl border border-stone-200 bg-gradient-to-r from-yellow-500 to-indigo-500 shadow-lg dark:border-stone-700 dark:from-amber-200 dark:to-sky-400 dark:shadow-stone-900/50 md:rounded-l-sm md:rounded-r-xl'
              layoutId='active-menu'
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
          <span className='relative z-40 flex items-center space-x-2 text-sm tracking-tight md:pr-1'>
            {isActive ? (
              <motion.span
                className='flex items-center space-x-1 text-amber-50 drop-shadow-md'
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 2,
                  ease: 'easeInOut',
                }}
              >
                {children}
              </motion.span>
            ) : (
              <span className='flex items-center space-x-1'>{children}</span>
            )}
          </span>
        </LinkComponent>
      </NavigationMenu.Link>
    </li>
  )
}
MenuLink.displayName = 'NavigationLinkMenuItem'
