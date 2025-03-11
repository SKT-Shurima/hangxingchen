import type { MDXComponents } from 'mdx/types'
import type { ReactNode } from 'react'
import NextImage from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Red: ({ children }) => (
      <span className='bg-gradient-to-r from-red-400 to-red-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-red-200 dark:to-red-400'>
        {children}
      </span>
    ),
    Green: ({ children }) => (
      <span className='bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-green-200 dark:to-green-400'>
        {children}
      </span>
    ),
    Blue: ({ children }) => (
      <span className='bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-blue-200 dark:to-indigo-400'>
        {children}
      </span>
    ),
    Purple: ({ children }) => (
      <span className='bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-purple-200 dark:to-violet-400'>
        {children}
      </span>
    ),
    Orange: ({ children }) => (
      <span className='bg-gradient-to-r from-orange-400 to-amber-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-orange-200 dark:to-amber-400'>
        {children}
      </span>
    ),
    Pink: ({ children }) => (
      <span className='bg-gradient-to-r from-pink-400 to-rose-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-pink-200 dark:to-rose-400'>
        {children}
      </span>
    ),
    Teal: ({ children }) => (
      <span className='bg-gradient-to-r from-teal-400 to-cyan-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-teal-200 dark:to-cyan-400'>
        {children}
      </span>
    ),
    Gradient: ({ children }) => (
      <span className='bg-gradient-to-r from-yellow-500 to-indigo-500 bg-clip-text font-bold tracking-tight text-transparent dark:from-amber-200 dark:to-sky-400'>
        {children}
      </span>
    ),
    Callout: ({
      children,
      type = 'info',
    }: {
      children: ReactNode
      type?: 'info' | 'warning' | 'error' | 'success'
    }) => {
      const styles = {
        info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200',
        warning:
          'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200',
        error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
        success:
          'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200',
      }

      return <div className={`my-4 rounded-r-lg border-l-4 p-4 ${styles[type]}`}>{children}</div>
    },
    AnimatedText: ({
      children,
      animation = 'fade',
    }: {
      children: ReactNode
      animation?: 'fade' | 'bounce' | 'pulse' | 'slide'
    }) => {
      const animations = {
        fade: 'animate-fade-in',
        bounce: 'animate-bounce',
        pulse: 'animate-pulse',
        slide: 'animate-slide-in-right',
      }

      return <span className={`inline-block ${animations[animation]}`}>{children}</span>
    },
    CodeBlock: ({ children, language }: { children: ReactNode; language?: string }) => (
      <div className='relative my-6 overflow-hidden rounded-lg'>
        <div className='absolute right-0 top-0 rounded-bl-lg bg-gray-800 px-4 py-1 text-xs font-semibold text-gray-100'>
          {language || 'code'}
        </div>
        <pre className='overflow-x-auto bg-gray-900 p-4 pt-8 text-sm text-gray-100 dark:bg-gray-950'>
          <code>{children}</code>
        </pre>
      </div>
    ),
    Card: ({ children, title, icon }: { children: ReactNode; title?: string; icon?: string }) => (
      <div className='animated-border relative my-4 p-6 shadow-sm transition-all duration-300 hover:shadow-md'>
        {title && (
          <div className='mb-4 flex items-center gap-2'>
            {icon && <span className='flex items-center justify-center text-xl leading-none'>{icon}</span>}
            <h3 className='text-lg font-semibold leading-none'>{title}</h3>
          </div>
        )}
        <div>{children}</div>
      </div>
    ),
    Badge: ({
      children,
      color = 'blue',
    }: {
      children: ReactNode
      color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray'
    }) => {
      const colors = {
        blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      }

      return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color]}`}>
          {children}
        </span>
      )
    },
    Highlight: ({
      children,
      color = 'yellow',
    }: {
      children: ReactNode
      color?: 'yellow' | 'green' | 'blue' | 'pink'
    }) => {
      const colors = {
        yellow: 'bg-yellow-200 dark:bg-yellow-800',
        green: 'bg-green-200 dark:bg-green-800',
        blue: 'bg-blue-200 dark:bg-blue-800',
        pink: 'bg-pink-200 dark:bg-pink-800',
      }

      return <span className={`rounded px-1 ${colors[color]}`}>{children}</span>
    },
    Image: NextImage,
  }
}
