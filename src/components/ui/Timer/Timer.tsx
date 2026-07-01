'use client'

import s from './t.module.scss'

import { useEffect, useState } from 'react'

const declensionNum = (
  num: number,
  words: [string, string, string],
): string => {
  const cases = [2, 0, 1, 1, 1, 2]
  const index =
    num % 100 > 4 && num % 100 < 20 ? 2 : cases[num % 10 < 5 ? num % 10 : 5]
  return words[index]
}

interface ITimerProps {
  targetDate: string | Date
  ref: React.ForwardedRef<HTMLDivElement>
}

function Timer({ targetDate, ref }: ITimerProps) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const deadline = new Date(targetDate)
    if (isNaN(deadline.getTime())) {
      console.warn('Invalid targetDate')
      return
    }

    const updateTimer = () => {
      const diff = deadline.getTime() - Date.now()
      if (diff <= 0) {
        setDays(0)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        return
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24))
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const m = Math.floor((diff / (1000 * 60)) % 60)
      const sec = Math.floor((diff / 1000) % 60)
      setDays(d)
      setHours(h)
      setMinutes(m)
      setSeconds(sec)
    }

    updateTimer()
    const timerId = setInterval(updateTimer, 1000)
    return () => clearInterval(timerId)
  }, [targetDate])

  const daysStr = String(days).padStart(2, '0')
  const hoursStr = String(hours).padStart(2, '0')
  const minutesStr = String(minutes).padStart(2, '0')
  const secondsStr = String(seconds).padStart(2, '0')

  const daysLabel = declensionNum(days, ['день', 'дні', 'днів'])
  const hoursLabel = declensionNum(hours, ['година', 'години', 'годин'])
  const minutesLabel = declensionNum(minutes, ['хвилина', 'хвилини', 'хвилин'])
  const secondsLabel = declensionNum(seconds, ['секунда', 'секунди', 'секунд'])
  return (
    <div className={s.timer} ref={ref}>
      <div className={s.timerItems}>
        <div className={s.timerItem}>
          {daysStr}:<span>{daysLabel}</span>
        </div>
        <div className={s.timerItem}>
          {hoursStr}:<span>{hoursLabel}</span>
        </div>
        <div className={s.timerItem}>
          {minutesStr}:<span>{minutesLabel}</span>
        </div>
        <div className={s.timerItem}>
          {secondsStr}:<span>{secondsLabel}</span>
        </div>
      </div>
    </div>
  )
}

export default Timer
