'use client'

import s from './s.module.scss'

import { useRef, useEffect } from 'react'
import { useAudio } from '@/context/AudioContext'
import {
  useFadeIn,
  useSlideIn,
  useScaleIn,
  useStagger,
} from '@/utils/animations'
import { componentProps } from '@/types/types'
import gsap from 'gsap'

import Pause from '@/components/ui/icons/Pause'
import Play from '@/components/ui/icons/Play'

function Schedule({ isVisible = true }: componentProps) {
  const { isPlaying, toggleAudio } = useAudio()

  const btnRef = useRef<HTMLButtonElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const datesRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef<HTMLParagraphElement>(null)

  useScaleIn(btnRef, { duration: 1, delay: 0.2, enabled: isVisible })
  useSlideIn(titleRef, {
    direction: 'top',
    distance: 40,
    duration: 1.2,
    delay: 0.4,
    enabled: isVisible,
  })
  useSlideIn(textRef, {
    direction: 'bottom',
    distance: 30,
    duration: 1.2,
    delay: 0.6,
    enabled: isVisible,
  })
  useStagger(datesRef, 'div', {
    duration: 1,
    stagger: 0.15,
    delay: 1.0,
    ease: 'power2.out',
    enabled: isVisible,
  })
  useFadeIn(timeRef, { duration: 1.2, delay: 1.2, enabled: isVisible })

  useEffect(() => {
    if (!isVisible) return
    const btn = btnRef.current
    if (!btn) return

    const totalDelay = 1 + 0.2

    const timer = setTimeout(() => {
      gsap.to(btn, {
        scale: 1.1,
        duration: 1,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, totalDelay * 1000)

    return () => clearTimeout(timer)
  }, [isVisible])

  return (
    <section className={s.schedule}>
      <div className={s.container}>
        <div className={s.box}>
          <button
            ref={btnRef}
            className={s.btn}
            onClick={toggleAudio}
            aria-label="Включить/отключить музыку"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <div className={s.text}>
            <h1 className={s.title} ref={titleRef}>
              ДОРОГИЕ ГОСТИ
            </h1>
            <p ref={textRef}>
              С БОЛЬШОЙ РАДОСТЬЮ ПРИГЛАШАЕМ ВАС РАЗДЕЛИТЬ С НАМИ ОДИН ИЗ САМЫХ
              ВАЖНЫХ ДНЕЙ В НАШЕЙ ЖИЗНИ
            </p>
          </div>
          <div className={s.times}>
            <div className={s.dates} ref={datesRef}>
              <div>25</div>
              <div>09</div>
              <div>2026</div>
            </div>
            <p ref={timeRef}>
              НАЧАЛО ТОРЖЕСТВА <span>15:00</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Schedule
