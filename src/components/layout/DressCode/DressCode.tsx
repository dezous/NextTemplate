'use client'

import s from './d.module.scss'

import { useRef } from 'react'
import { useScrollAnimation, useScrollStagger } from '@/utils/animations'

const colors = [
  'BURGUNDY',
  'DUSTY ROSE',
  'BABY PINK',
  'IVORY',
  'LIGHT GREEN',
  'OLIVE GREEN',
]

function DressCode() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const hrRef = useRef<HTMLHeadingElement>(null)
  const hrTwoRef = useRef<HTMLHeadingElement>(null)
  const headPRef = useRef<HTMLParagraphElement>(null)
  const paletteTitleRef = useRef<HTMLHeadingElement>(null)
  const ruleLadyRef = useRef<HTMLDivElement>(null)
  const ruleGentRef = useRef<HTMLDivElement>(null)

  const colorElements: (HTMLLIElement | null)[] = []

  useScrollAnimation(sectionRef, [
    {
      ref: titleRef,
      from: { opacity: 0, y: -30 },
      to: { opacity: 1, y: 0 },
      scrub: 1.5,
      start: 'top 90%',
      end: 'top 40%',
    },
    {
      ref: headPRef,
      from: { opacity: 0, y: 15 },
      to: { opacity: 1, y: 0 },
      scrub: 1.5,
      start: 'top 85%',
      end: 'top 35%',
    },
    {
      ref: hrRef,
      from: { opacity: 0 },
      to: { opacity: 1 },
      scrub: 1.5,
      start: 'top 80%',
      end: 'top 30%',
    },
    {
      ref: paletteTitleRef,
      from: { opacity: 0, y: -15 },
      to: { opacity: 1, y: 0 },
      scrub: 1.5,
      start: 'top 75%',
      end: 'top 25%',
    },
    {
      ref: hrTwoRef,
      from: { opacity: 0 },
      to: { opacity: 1 },
      scrub: 1.5,
      start: 'top 70%',
      end: 'top 20%',
    },
    {
      ref: ruleLadyRef,
      from: { opacity: 0, x: -30 },
      to: { opacity: 1, x: 0 },
      scrub: 1.5,
      start: 'top 65%',
      end: 'top 15%',
    },
    {
      ref: ruleGentRef,
      from: { opacity: 0, x: 30 },
      to: { opacity: 1, x: 0 },
      scrub: 1.5,
      start: 'top 60%',
      end: 'top 10%',
    },
  ])

  useScrollStagger(sectionRef, colorElements, {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    stagger: 0.2,
    scrub: 1.5,
    start: 'top 55%',
    end: 'top 5%',
    toggleActions: 'play none none reverse',
  })

  return (
    <section ref={sectionRef} className={s.dressCode}>
      <div className={s.container}>
        <div className={s.box}>
          <div className={s.topContent}>
            <div className={s.head}>
              <h2 ref={titleRef} className={s.title}>
                Dress Code
              </h2>
              <p ref={headPRef}>
                Будем очень признательны, если вы поддержите стилистику и
                цветовую гамму нашей свадьбы
              </p>
            </div>
            <div ref={hrRef} className={s.hr}></div>
            <div className={s.colorPalette}>
              <h3 ref={paletteTitleRef} className={s.title}>
                Wedding Color Palette
              </h3>
              <ul className={s.list}>
                {colors.map((color, index) => (
                  <li
                    key={index}
                    ref={(el) => {
                      colorElements[index] = el
                    }}
                    className={
                      s[`color${color.replace(/\s/g, '')}`] || s.colorItem
                    }
                  >
                    {color}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={s.bottomContent}>
            <div ref={hrTwoRef} className={s.hr}></div>
            <div className={s.rules}>
              <div ref={ruleLadyRef} className={s.rule}>
                <h4 className={s.title}>ЛЕДИ</h4>
                <p>
                  коктейльные или вечерние образы в оттенках нашей свадебной
                  палитры
                </p>
              </div>
              <div ref={ruleGentRef} className={s.rule}>
                <h4 className={s.title}>ДЖЕНТЕЛЬМЕНЫ</h4>
                <p>
                  классические костюмы либо костюмы из льна или хлопка в цветах
                  свадебной палитры
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode
