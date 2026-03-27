import '../App.css'
import trainer1 from '../assets/images/train-client1.png'
import trainer4 from '../assets/images/train-client2.png'
import trainer3 from '../assets/images/train-client3.png'
import trainer2 from '../assets/images/train-client4.png'
import trainer5 from '../assets/images/train-client5.png'
import { useEffect, useRef, useState } from 'react'
import MobileMenu from './MobileMenu'
import Hero from './Hero'
import Header from './header/Header'

function Hellich () {
  const [menuOpen, setMenuOpen] = useState(false)

  const [animate, setAnimate] = useState(false)
  const [aboutIntroVisible, setAboutIntroVisible] = useState(false)
  const aboutIntroRef = useRef<HTMLDivElement | null>(null)
  const comeTrainRef = useRef<HTMLDivElement | null>(null)
  const slidingImagesRef = useRef<HTMLDivElement | null>(null)
  const comeTrainTitleRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const body = document.body
    const root = document.documentElement
    body.classList.toggle('menu-open', menuOpen)
    root.classList.toggle('menu-open', menuOpen)

    return () => {
      body.classList.remove('menu-open')
      root.classList.remove('menu-open')
    }
  }, [menuOpen])

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
    const target = aboutIntroRef.current
    if (!target) return

    let rafId: number | null = null
    let timeoutId: number | null = null
    let wasInView = false

    const triggerAnimation = () => {
      setAboutIntroVisible(false)
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
      timeoutId = window.setTimeout(() => {
        setAboutIntroVisible(true)
      }, 50)
    }

    const checkInView = () => {
      const rect = target.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0

      if (inView && !wasInView) {
        triggerAnimation()
      } else if (!inView && wasInView) {
        setAboutIntroVisible(false)
      }

      wasInView = inView
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        checkInView()
      })
    }

    checkInView()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      if (timeoutId !== null) window.clearTimeout(timeoutId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const aboutIntroText = 'جسدك أمانة… قوِّه اليوم قبل أن يضعف غدا.'
  const aboutIntroWords = aboutIntroText.split(/\s+/)
  const wordDelayMs = 45

  const handleMenuOpen = (state: boolean) => {
    setMenuOpen(state)
  }
  return (
    <div className='hellich relative'>
      <MobileMenu menuOpen={menuOpen} />
      <Header
        animate={animate}
        menuOpen={menuOpen}
        handleMenuOpen={handleMenuOpen}
      />
      <Hero animate={animate} />
      <div className='about relative z-10 min-h-svh '>
        <div ref={aboutIntroRef} className='about-intro'>
          <h1
            dir='rtl'
            className='about-intro-title text-second-bg pt-20 mx-12 xl:mx-50 text-center'
          >
            {aboutIntroWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={`about-intro-word ${
                  aboutIntroVisible ? 'about-intro-word--visible' : ''
                }`}
                style={{
                  transitionDelay: `${index * wordDelayMs}ms`,
                  animationDelay: `${index * wordDelayMs}ms`
                }}
              >
                {word}
                {index < aboutIntroWords.length - 1 ? '\u00A0' : ''}
              </span>
            ))}
          </h1>
        </div>
        <div ref={comeTrainRef} className='come-train-w-me group'>
          <div ref={slidingImagesRef} className='sliding-images'>
            <h1
              dir='rtl'
              ref={comeTrainTitleRef}
              className='come-train-title absolute left-1/2 z-20 text-center w-max font-black leading-none tracking-[0.02em] text-[clamp(3.2rem,9vw,4.4rem)] sm:text-[clamp(3rem,7vw,4.8rem)] lg:text-[clamp(4.6rem,9vw,9.8rem)] pointer-events-none whitespace-nowrap text-cyan-400 drop-shadow-[0_2px_0_rgba(0,0,0,0.65)] transition-colors duration-300 group-hover:text-white'
            >
              تعال نتدرّب معا !
            </h1>
            <div className='sliding-images-track'>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hellich
