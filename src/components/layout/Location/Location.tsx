'use client'
import s from './l.module.scss'

import { useCallback, useRef } from 'react'
import { useAudio } from '@/context/AudioContext'
import Button from '@/components/ui/Button/Button'
import { useScrollAnimation } from '@/utils/animations'

function Location() {
  const { audioRef } = useAudio()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useScrollAnimation(sectionRef, [
    {
      ref: titleRef,
      from: { opacity: 0, y: -40 },
      to: { opacity: 1, y: 0 },
      scrub: 1.5,
      start: 'top 85%',
      end: 'top 40%',
    },
    {
      ref: btnRef,
      from: { opacity: 0, scale: 0.8 },
      to: { opacity: 1, scale: 1 },
      scrub: 1.5,
      start: 'top 75%',
      end: 'top 30%',
    },
    {
      ref: descRef,
      from: { opacity: 0, y: 30 },
      to: { opacity: 1, y: 0 },
      scrub: 1.5,
      start: 'top 65%',
      end: 'top 20%',
    },
  ])

  const goToMap = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
    }
    window.open(
      'https://maps.app.goo.gl/c3YcGYYRAZqQhTD76?g_st=ic',
      '_blank',
      'noopener,noreferrer',
    )
  }, [audioRef])

  return (
    <section ref={sectionRef} className={s.location}>
      <div className={s.container}>
        <div className={s.box}>
          <h2 ref={titleRef} className={s.title}>
            Локация
          </h2>
          <Button
            ref={btnRef}
            className={s.btn}
            onClick={goToMap}
            aria-label="Открыть локацию на карте"
          >
            ОСТРОВ ПАНГАН, ТАИЛАНД
          </Button>
          <p ref={descRef}>
            В атмосфере острова Панган, среди пальм, лазурных вод залива и
            красивейших закатов, мы отпразднуем этот особенный день.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Location
