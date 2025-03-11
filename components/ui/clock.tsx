'use client'

import React from 'react'

export function Clock() {
  const [time, setTime] = React.useState(new Date())
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  if (!mounted) {
    return null
  }

  const formatter = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'short',
  })

  return (
    <div className='flex h-8 items-center px-2 py-1'>
      <span className='select-none text-xs text-stone-400 dark:text-stone-600'>
        {formatter.format(time)}
      </span>
    </div>
  )
}
