'use client'

import s from './l.module.scss'

import clsx from 'clsx'
import Loader from '@/components/ui/icons/Loader'
import { useEffect, useState } from 'react'

function LoaderIcon({ fadeOut }: { fadeOut: boolean }) {
  return (
    <div className={clsx(s.loaderWrapper, fadeOut && s.fadeOut)}>
      <div className={s.loader}>
        <Loader />
      </div>
    </div>
  )
}

function GlobalLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const images: HTMLImageElement[] = Array.from(document.images)
    const videos: HTMLVideoElement[] = Array.from(
      document.querySelectorAll('video'),
    )

    const mediaPromises: Promise<void>[] = []

    // Images
    images.forEach((img) => {
      if (!img.complete) {
        mediaPromises.push(
          new Promise<void>((resolve) => {
            const onLoad = () => {
              img.removeEventListener('load', onLoad)
              img.removeEventListener('error', onLoad)
              resolve()
            }

            img.addEventListener('load', onLoad)
            img.addEventListener('error', onLoad)
          }),
        )
      }
    })

    // Videos
    videos.forEach((video) => {
      if (video.readyState < 3) {
        mediaPromises.push(
          new Promise<void>((resolve) => {
            const onLoaded = () => {
              video.removeEventListener('loadeddata', onLoaded)
              video.removeEventListener('error', onLoaded)
              resolve()
            }

            video.addEventListener('loadeddata', onLoaded)
            video.addEventListener('error', onLoaded)
          }),
        )
      }
    })

    Promise.all(mediaPromises).then(() => {
      setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }, 300) // мінімальний час показу
    })
  }, [])

  // Scroll lock
  useEffect(() => {
    if (isLoading) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth

      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <LoaderIcon fadeOut={fadeOut} />}
      {children}
    </>
  )
}

export default GlobalLoader
