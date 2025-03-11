'use client'

import type { TouchEvent } from 'react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

interface CarouselProps {
  images: {
    src: any
    alt: string
    color?: string
  }[]
  autoSlideInterval?: number
  className?: string
  imageClassName?: string
  showArrows?: boolean
  showDots?: boolean
  transitionType?: 'slide' | 'fade'
  aspectRatio?: string
  height?: number
  glowEffect?: boolean
  glowIntensity?: number
}

export function Carousel({
  images,
  autoSlideInterval = 5000,
  className = '',
  imageClassName = '',
  showArrows = true,
  showDots = true,
  transitionType = 'fade',
  aspectRatio = '16/9',
  height,
  glowEffect = true,
  glowIntensity = 8,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [dominantColors] = useState<string[]>(images.map((img) => img.color || '#3b82f6'))
  const carouselRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Touch event handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  useEffect(() => {
    if (autoSlideInterval <= 0) return

    const interval = setInterval(goToNext, autoSlideInterval)
    return () => clearInterval(interval)
  }, [autoSlideInterval])

  // 动态光环样式
  const glowStyles = {
    boxShadow: glowEffect ? `0 0 ${glowIntensity}px ${glowIntensity / 2}px ${dominantColors[currentIndex]}` : 'none',
    transition: 'box-shadow 1s ease-in-out',
  }

  // 图片样式，确保没有margin
  const imageStyle = {
    margin: 0,
    padding: 0,
    objectFit: 'cover' as const,
    objectPosition: 'center',
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg ${className}`}
      style={{
        aspectRatio,
        height: height ? `${height}px` : undefined,
        ...(glowEffect ? glowStyles : {}),
      }}
      ref={carouselRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {transitionType === 'slide' ? (
        <div
          className='flex transition-transform duration-500 ease-out h-full'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className='w-full flex-shrink-0 relative h-full p-0 m-0'>
              <Image
                src={image.src}
                alt={image.alt}
                className={`object-cover rounded-lg ${imageClassName}`}
                style={imageStyle}
                fill
                sizes='(max-width: 768px) 100vw, 700px'
              />
            </div>
          ))}
        </div>
      ) : (
        <div className='relative w-full h-full p-0 m-0'>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out p-0 m-0 ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                className={`object-cover rounded-lg ${imageClassName}`}
                style={imageStyle}
                fill
                sizes='(max-width: 768px) 100vw, 700px'
              />
            </div>
          ))}
        </div>
      )}

      {/* 添加一个渐变的内部边框效果 */}
      <div
        className='absolute inset-0 rounded-lg pointer-events-none'
        style={{
          boxShadow: `inset 0 0 ${glowIntensity / 2}px ${dominantColors[currentIndex]}`,
          transition: 'box-shadow 1s ease-in-out',
          opacity: glowEffect ? 0.3 : 0,
        }}
      />

      {showArrows && (
        <>
          <button
            onClick={goToPrevious}
            className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-20'
            aria-label='Previous slide'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M15 18l-6-6 6-6' />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-20'
            aria-label='Next slide'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M9 18l6-6-6-6' />
            </svg>
          </button>
        </>
      )}

      {showDots && (
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
              style={{
                boxShadow: index === currentIndex ? `0 0 3px 1px ${dominantColors[index]}` : 'none',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
