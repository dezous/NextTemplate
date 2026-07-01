'use client'

import s from './e.module.scss'

import clsx from 'clsx'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useState, useCallback, useRef } from 'react'
import { useAudio } from '@/context/AudioContext'
import { useFadeIn } from '@/utils/animations'

import Schedule from '@/components/layout/Schedule/Schedule'
import Location from '@/components/layout/Location/Location'
import DressCode from '@/components/layout/DressCode/DressCode'
import ConnectToChat from '@/components/layout/ConnectToChat/ConnectToChat'
import Contacts from '@/components/layout/Contacts/Contacts'
import Accommodation from '@/components/layout/Accommodation/Accommodation'
import SeeYouSoon from '@/components/layout/SeeYouSoon/SeeYouSoon'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function Envelope() {
  const { audioRef } = useAudio()
  const [isHideAll, setIsHideAll] = useState(false)
  const [isMainContentVisible, setIsMainContentVisible] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useFadeIn(mainRef, {
    duration: 1.2,
    delay: 0.2,
    enabled: isMainContentVisible,
  })

  const handleButtonClick = useCallback(() => {
    setIsHideAll(true)
    const audio = audioRef.current
    if (audio) {
      audio
        .play()
        .catch((err) => console.warn('Не вдалося запустити музику:', err))
    }
    setTimeout(() => {
      setIsMainContentVisible(true)
    }, 600)
  }, [audioRef])
  return (
    <>
      <audio ref={audioRef} src="/music/music.mp3" preload="auto" loop />

      <div className={clsx(s.envelope, isHideAll && s.hidden)}>
        <div className={clsx(s.box, isHideAll && s.hidden)}>
          <div
            className={clsx(
              s.envelopeTop,
              isHideAll && s.envelopeHidden,
              isHideAll && s.envelopeHiddenTop,
            )}
          >
            <img src="/images/envelopeTop.webp" alt="Верх конверта" />
          </div>
          <div
            className={clsx(
              s.envelopeBottom,
              isHideAll && s.envelopeHidden,
              isHideAll && s.envelopeHiddenBottom,
            )}
          >
            <img src="/images/envelopeBottom.webp" alt="Низ конверта" />
          </div>

          <button
            onClick={handleButtonClick}
            className={s.stamp}
            aria-label="Открыть конверт"
          >
            <img src="/images/stamp.webp" alt="" />
          </button>
          <p className={s.text}>Нажмите на печать, чтобы открыть</p>
        </div>
      </div>
      {isMainContentVisible && (
        <div ref={mainRef} className={s.mainContent}>
          <Schedule isVisible={isMainContentVisible} />
          <Location />
          <DressCode />
          <ConnectToChat />
          <Contacts />
          <Accommodation />
          <SeeYouSoon targetDate={'2026-09-25T15:00:00'} />
        </div>
      )}
    </>
  )
}

export default Envelope
