'use client'

import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { AnimationOptions } from '@/types/animations'

export const useScaleIn = (
  ref: RefObject<HTMLElement | null>,
  options: AnimationOptions,
) => {
  const {
    duration = 0.6,
    delay = 0,
    ease = 'back.out(1.7)',
    enabled = true,
  } = options

  useEffect(() => {
    if (!enabled) return
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.set(element, { scale: 0, opacity: 0 })
      gsap.to(element, { scale: 1, opacity: 1, duration, delay, ease })
    })

    return () => ctx.revert()
  }, [ref, duration, delay, ease, enabled])
}
