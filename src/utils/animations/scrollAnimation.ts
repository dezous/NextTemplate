'use client'

import { useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type AnimationTarget = {
  ref: RefObject<HTMLElement | null>
  from?: gsap.TweenVars & { duration?: number; ease?: string }
  to?: gsap.TweenVars & { duration?: number; ease?: string }
  toggleActions?: string
  scrub?: boolean | number
  markers?: boolean
  start?: string
  end?: string
  once?: boolean // если true, анимация не реверсируется
}

export const useScrollAnimation = (
  containerRef: RefObject<HTMLElement | null>,
  targets: AnimationTarget[],
) => {
  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      console.warn('Container ref not attached')
      return
    }

    const ctx = gsap.context(() => {
      targets.forEach(
        ({
          ref,
          from,
          to,
          toggleActions,
          scrub,
          markers,
          start,
          end,
          once,
        }) => {
          const el = ref.current
          if (!el) {
            console.warn('Element ref not attached')
            return
          }

          if (!from && !to) {
            console.warn('No from or to properties provided')
            return
          }

          // Извлекаем duration и ease из from и to, если они есть
          const fromProps = { ...from }
          const toProps = { ...to }
          let duration = 0.5
          let ease = 'power1.inOut'

          if (fromProps.duration !== undefined) {
            duration = fromProps.duration
            delete fromProps.duration
          } else if (toProps.duration !== undefined) {
            duration = toProps.duration
            delete toProps.duration
          }

          if (fromProps.ease !== undefined) {
            ease = fromProps.ease
            delete fromProps.ease
          } else if (toProps.ease !== undefined) {
            ease = toProps.ease
            delete toProps.ease
          }

          const toggle = once
            ? 'play none none reset'
            : toggleActions || 'play none none reverse'

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: start || 'top 80%',
              end: end || 'bottom 20%',
              toggleActions: toggle,
              scrub: scrub || false,
              markers: markers || false,
            },
            defaults: { duration, ease },
          })

          if (fromProps && toProps) {
            tl.fromTo(el, fromProps, toProps)
          } else if (fromProps) {
            tl.from(el, fromProps)
          } else if (toProps) {
            tl.to(el, toProps)
          }
        },
      )

      ScrollTrigger.refresh()
    }, container)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [containerRef, targets])
}
