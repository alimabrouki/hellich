import '../App.css'
import { useEffect, useRef, useState } from 'react'
import MobileMenu from './MobileMenu'
import Hero from './Hero'
import Header from './header/Header'
import ComeTrain from './ComeTrain'
import ProgramsSection from './ProgramsSection'
import WhoAmISection from './WhoAmISection'
import SlidingWords from './SlidingWords'

function Hellich () {
  const [menuOpen, setMenuOpen] = useState(false)

  const [animate, setAnimate] = useState(false)
  const [aboutIntroVisible, setAboutIntroVisible] = useState(false)
  const [logoOnLight, setLogoOnLight] = useState(false)
  const aboutIntroRef = useRef<HTMLDivElement | null>(null)

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
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-logo-contrast="dark"]')
    )
    if (!targets.length) return

    const visibleTargets = new Set<Element>()
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visibleTargets.add(entry.target)
          } else {
            visibleTargets.delete(entry.target)
          }
        })
        setLogoOnLight(visibleTargets.size > 0)
      },
      { threshold: 0.35 }
    )

    targets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
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
        logoOnLight={logoOnLight}
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

        <ComeTrain />
        <ProgramsSection />
        <SlidingWords />
        <WhoAmISection />
      </div>
    </div>
  )
}

export default Hellich
