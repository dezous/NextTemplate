'use client'

import { useCallback, useRef } from 'react'
import s from './c.module.scss'
import { useAudio } from '@/context/AudioContext'
import Form from '@/components/ui/Form/Form'
import { useScrollAnimation } from '@/utils/animations'

function Contacts() {
  const { audioRef } = useAudio()
  const sectionRef = useRef<HTMLElement>(null)
  const titleTopRef = useRef<HTMLHeadingElement>(null)
  const descTopRef = useRef<HTMLParagraphElement>(null)
  const coordinatorRef = useRef<HTMLDivElement>(null)
  const organizerRef = useRef<HTMLDivElement>(null)
  const titleBottomRef = useRef<HTMLHeadingElement>(null)
  const descBottomRef = useRef<HTMLParagraphElement>(null)

  useScrollAnimation(sectionRef, [
    // Верхняя часть — последовательно
    {
      ref: titleTopRef,
      from: { opacity: 0, y: -30 },
      to: { opacity: 1, y: 0 },
      scrub: 1.5,
      start: 'top 80%',
      end: 'top 60%',
    },
    {
      ref: descTopRef,
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0 },
      scrub: 1.5,
      start: 'top 74%',
      end: 'top 54%',
    },
    {
      ref: coordinatorRef,
      from: { opacity: 0, x: -20 },
      to: { opacity: 1, x: 0 },
      scrub: 1.5,
      start: 'top 68%',
      end: 'top 48%',
    },
    {
      ref: organizerRef,
      from: { opacity: 0, x: 20 },
      to: { opacity: 1, x: 0 },
      scrub: 1.5,
      start: 'top 62%',
      end: 'top 42%',
    },

    // Нижняя часть — начинается чуть позже, чтобы не перекрывать верхнюю
    {
      ref: titleBottomRef,
      from: { opacity: 0, y: -30 },
      to: { opacity: 1, y: 0 },
      scrub: 1,
      start: 'top 90%',
      end: 'bottom 60%',
    },
    {
      ref: descBottomRef,
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0 },
      scrub: 1,
      start: 'top 80%',
      end: 'bottom 50%',
    },
  ])

  const handleLinkClick = useCallback(() => {
    const audio = audioRef.current
    if (audio) audio.pause()
  }, [audioRef])

  return (
    <section ref={sectionRef} className={s.contacts}>
      <div className={s.container}>
        <div className={s.box}>
          <div className={s.topContent}>
            <div className={s.head}>
              <h2 ref={titleTopRef} className={s.title}>
                CONTACTS
              </h2>
              <p ref={descTopRef}>
                ПО ВСЕМ ОРГАНИЗАЦИОННЫМ ВОПРОСАМ ВЫ МОЖЕТЕ ОБРАЩАТЬСЯ К НАШЕЙ
                СВАДЕБНОЙ КОМАНДЕ:
              </p>
            </div>
            <div className={s.listContacts}>
              <div ref={coordinatorRef} className={s.contactItem}>
                <p className={s.contactItemName}>СВАДЕБНЫЙ КООРДИНАТОР</p>
                <div className={s.contactItemPhone}>
                  <span>Елена</span>
                  <a
                    href="https://t.me/eIena_JS"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                  >
                    +380 93 828 09 91 (Telegram)
                  </a>
                </div>
              </div>
              <div ref={organizerRef} className={s.contactItem}>
                <p className={s.contactItemName}>СВАДЕБНЫЙ ОРГАНИЗАТОР</p>
                <div className={s.contactItemPhone}>
                  <span>Юлия</span>
                  <a
                    href="https://t.me/Yuliia_Solodchenko"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                  >
                    +380 67 127 13 23 (Telegram)
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={s.bottomContent}>
            <div className={s.head}>
              <h3 ref={titleBottomRef} className={s.title}>
                rsvp
              </h3>
              <p ref={descBottomRef}>
                Будем признательны за подтверждение вашего участия до 10 июля
                2026 года
              </p>
            </div>
            <div className={s.form}>
              <div className={s.formBlock}>
                <Form className={s.tallyForm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacts
