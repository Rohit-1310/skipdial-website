'use client'

import { motion, useReducedMotion } from 'framer-motion'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const BAR_COUNT = 44

/** Deterministic bar heights — integer math only, so server and client agree exactly. */
const barRest = (i: number) => 0.25 + (((i * 7919 + 13) % 97) / 97) * 0.65

function formatTime(sec: number) {
  if (!Number.isFinite(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

type AudioPlayerProps = {
  src: string
  title: string
}

/**
 * Custom audio player: play/pause icon morph, waveform bars that animate
 * only during playback, mono elapsed timer. Keyboard-operable via the
 * native button; progress is announced through the timer text.
 */
export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const reduced = useReducedMotion()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onTime = () => setElapsed(el.currentTime)
    const onMeta = () => setDuration(el.duration)
    const onEnd = () => setPlaying(false)
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('ended', onEnd)
    // Metadata may already be loaded before this effect runs (cached audio)
    if (el.readyState >= 1 && Number.isFinite(el.duration)) setDuration(el.duration)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggle = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      void el.play()
      setPlaying(true)
    } else {
      el.pause()
      setPlaying(false)
    }
  }, [])

  const progress = duration > 0 ? elapsed / duration : 0

  return (
    <div className="card flex items-center gap-4 p-4 sm:gap-6 sm:p-5">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause: ${title}` : `Play: ${title}`}
        className="grid h-14 w-14 flex-shrink-0 cursor-pointer place-items-center rounded-full bg-accent text-white transition-transform active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          {playing ? (
            <motion.g initial={reduced ? false : { scale: 0.6 }} animate={{ scale: 1 }} key="pause">
              <rect x="4" y="3" width="4" height="14" rx="1.2" />
              <rect x="12" y="3" width="4" height="14" rx="1.2" />
            </motion.g>
          ) : (
            <motion.path
              key="play"
              initial={reduced ? false : { scale: 0.6 }}
              animate={{ scale: 1 }}
              d="M6 3.8c0-.9 1-1.5 1.8-1L16 9.1c.8.5.8 1.6 0 2.1L7.8 17.4c-.8.5-1.8-.1-1.8-1V3.8z"
            />
          )}
        </svg>
      </button>

      <div
        className={`flex h-12 min-w-0 flex-1 items-center gap-[3px] overflow-hidden ${playing ? 'is-playing' : ''}`}
        aria-hidden="true"
      >
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <span
            key={i}
            className="wave-bar h-full w-[3px] shrink-0 rounded-full"
            style={
              {
                background:
                  progress > 0 && i / BAR_COUNT <= progress
                    ? 'var(--color-accent)'
                    : 'var(--color-line)',
                '--rest': barRest(i),
                '--dur': `${0.7 + barRest(i) * 0.6}s`,
                '--delay': `${(i % 7) * 0.06}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <p className="mono-label flex-shrink-0 normal-case! text-ink-2" role="timer">
        {formatTime(elapsed)}
        <span className="text-line"> / </span>
        {formatTime(duration)}
      </p>
    </div>
  )
}
