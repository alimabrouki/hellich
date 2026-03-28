import '../App.css'
import trainer1 from '../assets/images/train-client1.png'
import trainer4 from '../assets/images/train-client2.png'
import trainer3 from '../assets/images/train-client3.png'
import trainer2 from '../assets/images/train-client4.png'
import trainer5 from '../assets/images/train-client5.png'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
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
  const programsRef = useRef<HTMLElement | null>(null)

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

    const root = document.documentElement
    if (!supportsScrollTimeline) {
      root.classList.add('no-scroll-timeline')
    }
    let rafId: number | null = null

    const update = () => {
      rafId = null
      const section = comeTrainRef.current
      const title = comeTrainTitleRef.current
      const stage = slidingImagesRef.current
      const programs = programsRef.current
      const vh = window.innerHeight || 1

      if (!supportsScrollTimeline && section && title && stage) {
        const rect = section.getBoundingClientRect()
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

      if (programs) {
        const programsRect = programs.getBoundingClientRect()
        const programsStart = vh * 1.1
        const programsEnd = vh * 0.1
        const programsRaw =
          (programsStart - programsRect.top) / (programsStart - programsEnd)
        const programsProgress = Math.min(Math.max(programsRaw, 0), 1)
        const eased = 1 - Math.pow(1 - programsProgress, 3)
        const isMobile = window.innerWidth < 720
        const separationStart = isMobile ? 16 : 22
        const separationEnd = isMobile ? -24 : -40
        const shiftStart = isMobile ? 10 : 20
        const shiftEnd = 0
        const separation =
          separationStart + (separationEnd - separationStart) * eased
        const shift = shiftStart + (shiftEnd - shiftStart) * eased
        programs.style.setProperty(
          '--programs-stack-separation',
          `${separation.toFixed(1)}px`
        )
        programs.style.setProperty(
          '--programs-stack-shift',
          `${shift.toFixed(1)}px`
        )
      }
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (!supportsScrollTimeline) {
        root.classList.remove('no-scroll-timeline')
      }
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
  const comeTrainWords = ['تعال', 'نتدرّب', 'معا !']
  const nutritionPrograms = [
    {
      title: 'وقود زيادة نظيفة',
      description: 'هيكلة عالية البروتين مع كربوهيدرات ذكية وتحضير أسبوعي.',
      tags: ['٤ أسابيع', 'حسب الماكروز', 'تحضير وجبات']
    },
    {
      title: 'إعادة ضبط خسارة الدهون',
      description: 'تدوير السعرات، التحكم في الشهية، وتعافٍ سريع.',
      tags: ['مرحلة تنشيف', 'بروتين عالٍ', 'ضغط منخفض']
    },
    {
      title: 'وقود الأداء',
      description: 'وجبات بتوقيت دقيق لأيام التدريب والراحة.',
      tags: ['رياضي', 'توقيت', 'ترطيب']
    },
    {
      title: 'قوة نباتية',
      description: 'بروتينات كاملة مع بدائل سهلة ووصفات بسيطة.',
      tags: ['نباتي', 'مناسب للمعدة', 'بسيط']
    }
  ]
  const splitPrograms = [
    {
      title: '٤ أيام علوي / سفلي',
      description: 'توازن بين القوة والضخامة مع تعافٍ مدمج.',
      tags: ['متوسط', '٤ أيام', 'قوة']
    },
    {
      title: 'دفع / سحب / أرجل',
      description: 'تقسيمة كلاسيكية لزيادة الحجم والكثافة.',
      tags: ['ضخامة', '٥-٦ أيام', 'حجم']
    },
    {
      title: '٣ أيام جسم كامل',
      description: 'تمارين جسم كامل بكفاءة لأسابيع الانشغال.',
      tags: ['مبتدئ', '٣ أيام', 'موفّر للوقت']
    },
    {
      title: 'تقسيمة القوة الرياضية',
      description: 'قوة وسرعة ولياقة في نظام واحد.',
      tags: ['أداء', '٥ أيام', 'انفجارية']
    }
  ]

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

        <div ref={comeTrainRef} className='come-train-w-me'>
          <div ref={slidingImagesRef} className='sliding-images'>
            <h1
              dir='rtl'
              ref={comeTrainTitleRef}
              className='come-train-title absolute left-1/2 z-20 text-center w-max font-black leading-none tracking-[0.02em] text-[clamp(3.2rem,9vw,4.4rem)] sm:text-[clamp(3rem,7vw,4.8rem)] lg:text-[clamp(4.6rem,9vw,9.8rem)] pointer-events-auto text-cyan-400 drop-shadow-[0_2px_0_rgba(0,0,0,0.65)] transition-colors duration-300 hover:text-white'
            >
              {comeTrainWords.map((word, index) => (
                <span
                  className='come-train-title__word'
                  key={`${word}-${index}`}
                >
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
      </div>
      <section
        ref={programsRef}
        className='programs-section about'
        aria-labelledby='programs-title'
        dir='rtl'
      >
        <div className='programs-inner'>
          <h1 id='programs-title' className='programs-title'>
            برامج مجانية !
          </h1>
          <div className='programs-columns'>
            <div className='programs-column programs-column--left'>
              <h2 className='programs-column-title'>تقسيمات التمرين</h2>
              <div
                className='programs-stack'
                style={
                  {
                    '--stack-pad': `${(splitPrograms.length - 1) * 28}px`
                  } as CSSProperties
                }
              >
                {splitPrograms.map((program, index) => (
                  <article
                    className='program-card program-card--stack'
                    key={`split-${program.title}`}
                    style={
                      {
                        '--stack-index': index * -1,
                        '--stack-z': splitPrograms.length - index
                      } as CSSProperties
                    }
                  >
                    <div className='program-card__header'>
                      <span className='program-card__index'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className='program-card__title'>{program.title}</h3>
                    </div>
                    <div className='program-card__details'>
                      <p className='program-card__desc'>{program.description}</p>
                      <div className='program-card__tags'>
                        {program.tags.map(tag => (
                          <span
                            className='program-tag'
                            key={`${program.title}-${tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className='programs-column programs-column--right'>
              <h2 className='programs-column-title'>دليل التغذية</h2>
              <div
                className='programs-stack'
                style={
                  {
                    '--stack-pad': `${(nutritionPrograms.length - 1) * 28}px`
                  } as CSSProperties
                }
              >
                {nutritionPrograms.map((program, index) => (
                  <article
                    className='program-card program-card--stack'
                    key={`nutrition-${program.title}`}
                    style={
                      {
                        '--stack-index': index,
                        '--stack-z': nutritionPrograms.length - index
                      } as CSSProperties
                    }
                  >
                    <div className='program-card__header'>
                      <span className='program-card__index'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className='program-card__title'>{program.title}</h3>
                    </div>
                    <div className='program-card__details'>
                      <p className='program-card__desc'>{program.description}</p>
                      <div className='program-card__tags'>
                        {program.tags.map(tag => (
                          <span
                            className='program-tag'
                            key={`${program.title}-${tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hellich
