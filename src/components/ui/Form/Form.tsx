'use client'
import { useEffect } from 'react'

export default function Form({ className }: { className?: string }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://tally.so/widgets/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])
  return (
    <iframe
      data-tally-src="https://tally.so/embed/PdgW55?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
      loading="lazy"
      width="100%"
      title="Анатолій та Вікторія ru"
    ></iframe>
  )
}
