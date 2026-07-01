'use client'

import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type StaggerConfig = {
  from: gsap.TweenVars & { duration?: number; ease?: string }
  to: gsap.TweenVars & { duration?: number; ease?: string }
  stagger?: number | { each?: number; from?: 'start' | 'center' | 'end' }
  toggleActions?: string
  scrub?: boolean | number
  markers?: boolean
  start?: string
  end?: string
  once?: boolean
}

export const useScrollStagger = (
  containerRef: RefObject<HTMLElement | null>,
  elements: (HTMLElement | null)[], // 👈 принимаем массив элементов
  config: StaggerConfig,
) => {
  const {
    from,
    to,
    stagger = 0.1,
    toggleActions = 'play none none reverse',
    scrub = false,
    markers = false,
    start = 'top 80%',
    end = 'bottom 20%',
    once = false,
  } = config

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const validElements = elements.filter(Boolean) as HTMLElement[]
    if (!validElements.length) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start,
          end,
          toggleActions: once ? 'play none none reset' : toggleActions,
          scrub,
          markers,
        },
        defaults: {
          duration: from.duration || to.duration || 1.2,
          ease: from.ease || to.ease || 'power1.out',
        },
      })

      tl.fromTo(validElements, from, { ...to, stagger })

      ScrollTrigger.refresh()
    }, container)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [containerRef, elements, config])
}
