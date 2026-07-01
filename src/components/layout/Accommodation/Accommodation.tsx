'use client'

import { useRef } from 'react'
import s from './a.module.scss'
import { useScrollAnimation } from '@/utils/animations'

function Accommodation() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const item1Ref = useRef<HTMLDivElement>(null)
  const item2Ref = useRef<HTMLDivElement>(null)

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
      ref: descRef,
      from: { opacity: 0, y: 30 },
      to: { opacity: 1, y: 0 },
      scrub: 1.5,
      start: 'top 75%',
      end: 'top 30%',
    },
    {
      ref: item1Ref,
      from: { opacity: 0, x: -20 },
      to: { opacity: 1, x: 0 },
      scrub: 1.5,
      start: 'top 65%',
      end: 'top 20%',
    },
    {
      ref: item2Ref,
      from: { opacity: 0, x: 20 },
      to: { opacity: 1, x: 0 },
      scrub: 1.5,
      start: 'top 55%',
      end: 'top 10%',
    },
  ])

  return (
    <section ref={sectionRef} className={s.accommodation}>
      <div className={s.container}>
        <div className={s.box}>
          <h2 ref={titleRef} className={s.title}>
            Accommodation
          </h2>

          <div className={s.contentBottom}>
            <p ref={descRef}>
              Мы позаботились о вашем проживании на острове PhaNgan
            </p>
            <div className={s.items}>
              <div ref={item1Ref} className={s.item}>
                <p>
                  <span>Check-in:</span>24 сентября в 14:00
                </p>
              </div>
              <div ref={item2Ref} className={s.item}>
                <p>
                  <span>Check-out:</span>27 сентября  в 11:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Accommodation
