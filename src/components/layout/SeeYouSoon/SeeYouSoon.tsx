'use client'

import s from './s.module.scss'

import { useRef } from 'react'
import { useScrollAnimation } from '@/utils/animations'
import Timer from '@/components/ui/Timer/Timer'

interface ISeeYouSoonProps {
  targetDate: string | Date
}

const SeeYouSoon: React.FC<ISeeYouSoonProps> = ({ targetDate }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const timerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useScrollAnimation(sectionRef, [
    {
      ref: titleRef,
      from: { opacity: 0, y: -30, duration: 1, ease: 'power1.out' },
      to: { opacity: 1, y: 0 },
      toggleActions: 'play none none reverse',
      start: 'top 80%',
      end: 'bottom 20%',
    },
    {
      ref: timerRef,
      from: { opacity: 0, scale: 0.9, duration: 1, ease: 'power1.out' },
      to: { opacity: 1, scale: 1 },
      toggleActions: 'play none none reverse',
      start: 'top 80%',
      end: 'bottom 20%',
    },
    {
      ref: textRef,
      from: { opacity: 0, y: 20, duration: 1, ease: 'power1.out' },
      to: { opacity: 1, y: 0 },
      toggleActions: 'play none none reverse',
      start: 'top 70%',
      end: 'bottom 20%',
    },
  ])

  return (
    <section ref={sectionRef} className={s.seeYouSoon}>
      <div className={s.container}>
        <div className={s.box}>
          <h2 ref={titleRef} className={s.title}>
            SEE YOU SOON
          </h2>
          <Timer ref={timerRef} targetDate={targetDate} />
          <p ref={textRef}>З любов&rsquo;ю, Анатолій та Вікторія</p>
        </div>
      </div>
    </section>
  )
}

export default SeeYouSoon
