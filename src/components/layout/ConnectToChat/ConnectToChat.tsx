'use client'

import { useRef, useCallback } from 'react'
import s from './c.module.scss'
import { useAudio } from '@/context/AudioContext'
import Button from '@/components/ui/Button/Button'
import { useScrollAnimation } from '@/utils/animations'

function ConnectToChat() {
  const { audioRef } = useAudio()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useScrollAnimation(sectionRef, [
    {
      ref: titleRef,
      from: { opacity: 0, y: -30 },
      to: { opacity: 1, y: 0 },
      scrub: 1.5,
      start: 'top 85%',
      end: 'top 40%',
    },
    {
      ref: textRef,
      from: { opacity: 0, y: 30 },
      to: { opacity: 1, y: 0 },
      scrub: 1.5,
      start: 'top 75%',
      end: 'top 30%',
    },
    {
      ref: btnRef,
      from: { opacity: 0, scale: 0.9 },
      to: { opacity: 1, scale: 1 },
      scrub: 1.5,
      start: 'top 65%',
      end: 'top 20%',
    },
  ])

  const goToChat = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
    }
    window.open(
      'https://chat.whatsapp.com/EfQSly650QE5i1ypUTRww1?mode=gi_t',
      '_blank',
      'noopener,noreferrer',
    )
  }, [audioRef])

  return (
    <section ref={sectionRef} className={s.stayConected}>
      <div className={s.container}>
        <div className={s.box}>
          <h2 ref={titleRef} className={s.title}>
            Stay<span>connected</span>
          </h2>
          <p ref={textRef}>
            В этом чате вы найдёте всю важную информацию и организационные
            детали праздника. А в день свадьбы сможете делиться своими
            фотографиями и видео, чтобы вместе сохранить самые тёплые
            воспоминания этого особенного дня.
          </p>
          <Button
            ref={btnRef}
            className={s.btn}
            onClick={goToChat}
            aria-label="Присоединиться к чату"
          >
            Присоединиться к чату
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ConnectToChat
