'use client'

import { useEffect, useRef, createContext, useContext, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type GSAPContextType = {
  gsap: typeof gsap
  ScrollTrigger: typeof ScrollTrigger
}

const GSAPContext = createContext<GSAPContextType | null>(null)

export const useGSAP = () => {
  const context = useContext(GSAPContext)
  if (!context) {
    throw new Error('useGSAP must be used within GSAPProvider')
  }
  return context
}

export const GSAPProvider = ({ children }: { children: ReactNode }) => {
  const isMounted = useRef(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && !isMounted.current) {
      gsap.registerPlugin(ScrollTrigger)
      isMounted.current = true
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <GSAPContext.Provider value={{ gsap, ScrollTrigger }}>
      {children}
    </GSAPContext.Provider>
  )
}
