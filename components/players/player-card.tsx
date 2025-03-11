import type { StaticImageData } from 'next/image'

interface ZolplayerCardProps {
  avatarUrl?: StaticImageData
  base64Image?: string
  size?: number // Allow customizable size
}

export function ZolplayerCard({
  avatarUrl,
  base64Image,
  size = 100, // Default size of 100px
}: ZolplayerCardProps) {
  return (
    <div className='flex items-center justify-center p-2'>
      <div className='transform touch-manipulation transition-transform duration-300 hover:scale-110 active:scale-95'>
        {base64Image ? (
          <span
            style={{
              backgroundImage: `url(${base64Image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'block',
              width: `${size}px`,
              height: `${size}px`,
              maxWidth: '100%',
            }}
            className='rounded-full border-2 border-stone-200 shadow-md dark:border-stone-700'
            role='img'
            aria-label='Player avatar'
          />
        ) : avatarUrl ? (
          <span
            style={{
              backgroundImage: `url(${avatarUrl.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'block',
              width: `${size}px`,
              height: `${size}px`,
              maxWidth: '100%',
            }}
            className='rounded-full border-2 border-stone-200 shadow-md dark:border-stone-700'
            role='img'
            aria-label='Player avatar'
          />
        ) : null}
      </div>
    </div>
  )
}
