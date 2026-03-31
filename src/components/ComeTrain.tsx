import { useEffect, useRef } from 'react'
import '../styles/ComeTrain.css'
import trainer1 from '../assets/images/train-client1.png'
import trainer4 from '../assets/images/train-client2.png'
import trainer3 from '../assets/images/train-client3.png'
import trainer2 from '../assets/images/train-client4.png'
import trainer5 from '../assets/images/train-client5.png'

const comeTrainWords = ['تعال', 'نتدرّب', 'معا !']

function ComeTrain () {
  const comeTrainRef = useRef<HTMLDivElement | null>(null)
  const slidingImagesRef = useRef<HTMLDivElement | null>(null)
  const comeTrainTitleRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    const supportsScrollTimeline =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      (CSS.supports('animation-timeline: --come-train') ||
        CSS.supports('animation-timeline: auto'))

    if (supportsScrollTimeline) return

    const root = document.documentElement
    root.classList.add('no-scroll-timeline')
    let rafId: number | null = null

    const update = () => {
      rafId = null
      const section = comeTrainRef.current
      const title = comeTrainTitleRef.current
      const stage = slidingImagesRef.current
      if (!section || !title || !stage) return

      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const start = vh * 1.15
      const end = vh * 0.15
      const rawProgress = (start - rect.top) / (start - end)
      const progress = Math.min(Math.max(rawProgress, 0), 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      const stageRect = stage.getBoundingClientRect()
      const titleRect = title.getBoundingClientRect()
      const isMobile = window.innerWidth < 640
      const maxOffset = isMobile
        ? Math.max((stageRect.height - titleRect.height) / 2, 0)
        : vh * 0.35
      const offset = (1 - eased) * maxOffset
      section.style.setProperty(
        '--come-train-title-offset',
        `${offset.toFixed(1)}px`
      )

      const shiftStart = -22
      const shiftEnd = -6
      const trackShift = shiftStart + (shiftEnd - shiftStart) * eased
      section.style.setProperty(
        '--come-train-track-shift',
        `${trackShift.toFixed(2)}%`
      )
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      root.classList.remove('no-scroll-timeline')
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const section = comeTrainRef.current
    if (!section) return

    let rafId: number | null = null
    let lastScrollY = window.scrollY
    let currentShift = 0

    const update = () => {
      rafId = null
      const isMobile = window.innerWidth < 640
      if (!isMobile) {
        section.style.setProperty('--come-train-mobile-shift', '0px')
        lastScrollY = window.scrollY
        return
      }

      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const start = vh * 1.1
      const end = vh * 0.15
      const rawProgress = (start - rect.top) / (start - end)
      const progress = Math.min(Math.max(rawProgress, 0), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const direction = window.scrollY >= lastScrollY ? 1 : -1
      lastScrollY = window.scrollY

      const maxShift = Math.min(window.innerWidth * 0.12, 36)
      const targetShift = eased * maxShift * direction
      currentShift += (targetShift - currentShift) * 0.18
      section.style.setProperty(
        '--come-train-mobile-shift',
        `${currentShift.toFixed(2)}px`
      )
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={comeTrainRef}
      className='come-train-w-me relative mt-14 overflow-hidden'
    >
      <div ref={slidingImagesRef} className='sliding-images'>
        <h1
          dir='rtl'
          ref={comeTrainTitleRef}
          className='come-train-title absolute left-1/2 z-20 text-center w-max font-black leading-none tracking-[0.02em] text-[clamp(3.2rem,9vw,4.4rem)] sm:text-[clamp(3rem,7vw,4.8rem)] lg:text-[clamp(4.6rem,9vw,9.8rem)] pointer-events-auto text-cyan-400 drop-shadow-[0_2px_0_rgba(0,0,0,0.65)] transition-colors duration-300 hover:text-white'
        >
          {comeTrainWords.map((word, index) => (
            <span className='come-train-title__word' key={`${word}-${index}`}>
              {word}
            </span>
          ))}
        </h1>
        <div className='sliding-images-track sliding-images-track--desktop'>
          <div className='slide-card'>
            <img src={trainer1} alt='' className='slide-card__img' />
          </div>
          <div className='slide-card'>
            <img src={trainer2} alt='' className='slide-card__img' />
          </div>
          <div className='slide-card'>
            <img src={trainer3} alt='' className='slide-card__img' />
          </div>
          <div className='slide-card'>
            <img src={trainer4} alt='' className='slide-card__img' />
          </div>
          <div className='slide-card'>
            <img src={trainer5} alt='' className='slide-card__img' />
          </div>
        </div>
        <div className='sliding-images-mobile'>
          <div className='sliding-images-row sliding-images-row--top'>
            <div className='slide-card'>
              <img src={trainer1} alt='' className='slide-card__img' />
            </div>
            <div className='slide-card'>
              <img src={trainer2} alt='' className='slide-card__img' />
            </div>
          </div>
          <div className='sliding-images-row sliding-images-row--bottom'>
            <div className='slide-card'>
              <img src={trainer3} alt='' className='slide-card__img' />
            </div>
            <div className='slide-card'>
              <img src={trainer4} alt='' className='slide-card__img' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComeTrain
