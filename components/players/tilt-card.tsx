'use client'
import type { ReactNode } from 'react'

import { clsxm } from '@zolplay/utils'
import { atom, useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'

const focusingMemberSlugAtom = atom<string | null>(null)

export function TiltCard({ children, player }: { children: ReactNode; player: any }) {
  const [focusingMember, setFocusingMember] = useAtom(focusingMemberSlugAtom)
  const onMouseEnter = useCallback(() => {
    setFocusingMember(player.slug)
  }, [player.slug, setFocusingMember])
  const onMouseLeave = useCallback(() => {
    setFocusingMember(null)
  }, [setFocusingMember])

  const [tiltEnabled, setTiltEnabled] = useState(true)
  // only enable tilt on non-mobile devices
  useEffect(() => {
    if (/Mobi|Android|iPhone|iPad/i.test(window.navigator.userAgent)) {
      setTiltEnabled(false)
    }
  }, [])

  return (
    <Tilt
      className={clsxm([
        'not-prose group flex flex-col justify-between rounded-2xl p-2.5 md:p-4',
        'border border-stone-100 bg-white text-[var(--accent)] dark:border-stone-800 dark:bg-stone-900',
        '[--accent:var(--mb-accent)] dark:[--accent:var(--mb-accent-dark)]',
        '[transform-style:preserve-3d]',
        {
          'md:opacity-80 md:blur-[1px]': focusingMember !== null && focusingMember !== player.slug,
          'blur-none': focusingMember === player.slug,
        },
      ])}
      style={{
        '--mb-accent': player.portrait.palette.background.light,
        '--mb-accent-dark': player.portrait.palette.background.dark,
      }}
      tiltEnable={tiltEnabled}
      perspective={400}
      scale={1.05}
      glareEnable={false}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      onEnter={onMouseEnter}
      onLeave={onMouseLeave}
    >
      {children}
    </Tilt>
  )
}
