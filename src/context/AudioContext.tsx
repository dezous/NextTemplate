'use client'

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react'

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>
  isPlaying: boolean
  toggleAudio: () => void
}

const AudioPlayerContext = createContext<AudioContextType | null>(null)

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
    }
  }, [])

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio
        .play()
        .catch((err) => console.warn('Не вдалося відтворити музику:', err))
    } else {
      audio.pause()
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && audio.paused) {
        audio
          .play()
          .catch((err) =>
            console.warn('Не вдалося відтворити після повернення:', err),
          )
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <AudioPlayerContext.Provider value={{ audioRef, isPlaying, toggleAudio }}>
      <audio ref={audioRef} src="/music/music.mp3" preload="auto" loop />
      {children}
    </AudioPlayerContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioPlayerContext)
  if (!context) {
    throw new Error('useAudio має використовуватися всередині AudioProvider')
  }
  return context
}
