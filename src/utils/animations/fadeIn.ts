'use client'

import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { AnimationOptions } from '@/types/animations'

export const useFadeIn = (
  ref: RefObject<HTMLElement | null>,
  options: AnimationOptions,
) => {
  const {
    duration = 1,
    delay = 0,
    ease = 'power2.out',
    enabled = true,
  } = options

  useEffect(() => {
    if (!enabled) return
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.set(element, { opacity: 0 })
      gsap.to(element, { opacity: 1, duration, delay, ease })
    })

    return () => ctx.revert()
  }, [ref, duration, delay, ease, enabled])
}
