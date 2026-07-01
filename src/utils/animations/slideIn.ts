'use client'

import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { AnimationOptions } from '@/types/animations'

type Direction = 'left' | 'right' | 'top' | 'bottom'

interface SlideOptions extends AnimationOptions {
  direction?: Direction
  distance?: number
}

export const useSlideIn = (
  ref: RefObject<HTMLElement | null>,
  options: SlideOptions,
) => {
  const {
    direction = 'bottom',
    distance = 50,
    duration = 0.8,
    delay = 0,
    ease = 'power2.out',
    enabled = true,
  } = options

  useEffect(() => {
    if (!enabled) return
    const element = ref.current
    if (!element) return

    const fromProps: gsap.TweenVars = { opacity: 0 }
    const toProps: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease,
    }

    switch (direction) {
      case 'left':
        fromProps.x = -distance
        break
      case 'right':
        fromProps.x = distance
        break
      case 'top':
        fromProps.y = -distance
        break
      case 'bottom':
        fromProps.y = distance
        break
      default:
        fromProps.y = distance
    }

    const ctx = gsap.context(() => {
      gsap.set(element, fromProps)
      gsap.to(element, toProps)
    })

    return () => ctx.revert()
  }, [ref, direction, distance, duration, delay, ease, enabled])
}
