'use client'

import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { AnimationOptions } from '@/types/animations'

interface StaggerOptions extends AnimationOptions {
  stagger?: number
  from?: 'start' | 'center' | 'end'
}

export const useStagger = (
  containerRef: RefObject<HTMLElement | null>,
  childSelector: string,
  options: StaggerOptions,
) => {
  const {
    duration = 0.6,
    delay = 0,
    ease = 'power2.out',
    stagger = 0.1,
    from = 'start',
    enabled = true,
  } = options

  useEffect(() => {
    if (!enabled) return
    const container = containerRef.current
    if (!container) return
    const children = container.querySelectorAll(childSelector)
    if (!children.length) return

    const ctx = gsap.context(() => {
      gsap.set(children, { opacity: 0, y: 30 })
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease,
        stagger: { each: stagger, from },
      })
    })

    return () => ctx.revert()
  }, [
    containerRef,
    childSelector,
    duration,
    delay,
    ease,
    stagger,
    from,
    enabled,
  ])
}
