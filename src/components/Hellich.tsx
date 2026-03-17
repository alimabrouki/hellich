import '../App.css'

import { useEffect, useRef, useState } from 'react'
import MobileMenu from './MobileMenu'
import Hero from './Hero'
import Header from './header/Header'

function Hellich () {
  const [menuOpen, setMenuOpen] = useState(false)

  const [animate, setAnimate] = useState(false)
  const [aboutIntroVisible, setAboutIntroVisible] = useState(false)
  const aboutIntroRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style = 'overflow:hidden'
    } else {
      document.body.style = ''
    }
  }, [menuOpen])

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
            className='about-intro-title text-second-bg pt-20 mx-12 text-center'
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
      </div>
    </div>
  )
}

export default Hellich
