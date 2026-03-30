import { useEffect, useRef, useState } from 'react'
import './WhoAmISection.css'
import whoAmIImage from '../assets/images/who-am-i.jpg'

const whoTitle = 'من أنا ؟'
const whoTitleWords = whoTitle.split(/\s+/)
const wordDelayMs = 45
const certifiedTitle = 'مدرب متخصص يوجّهك لتحقيق أفضل جسم وعقلية'
const certifiedTitleWords = certifiedTitle.split(/\s+/)
const certifiedSubtitle =
  'أنا محمد مبروكي (hellich)، مدرب لياقة متخصص مكرّس لمساعدة الناس على تحويل أجسامهم ونمط حياتهم، بمزيج من تدريب القوة وإرشاد التغذية والتحفيز، أجعل اللياقة بسيطة وفعالة ومستدامة.'
const certifiedSubtitleWords = certifiedSubtitle.split(/\s+/)

const stats = [
  { value: 6, suffix: '+', lines: ['سنوات', 'خبرة'] },
  { value: 246, suffix: '', lines: ['عملاء سعداء'] },
  { value: 458, suffix: '+', lines: ['جلسات مكتملة'] },
  { value: 15, suffix: '+', lines: ['برامج مخصصة'] }
]
function WhoAmISection () {
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const infoRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [infoVisible, setInfoVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const [statValues, setStatValues] = useState<number[]>(() =>
    stats.map(() => 0)
  )
  const statsAnimatedRef = useRef(false)

  useEffect(() => {
    const title = titleRef.current
    if (!title) return

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTitleVisible(true)
          }
        },
        { threshold: 0.6 }
      )
      observer.observe(title)
      return () => observer.disconnect()
    }

    const onScroll = () => {
      const rect = title.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (inView) {
        setTitleVisible(true)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const info = infoRef.current
    const image = imageRef.current
    if (!info && !image) return

    const reveal = (entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return
      if (entry.target === info) setInfoVisible(true)
      if (entry.target === image) setImageVisible(true)
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => reveal(entry))
        },
        { threshold: 0.35 }
      )

      if (info) observer.observe(info)
      if (image) observer.observe(image)
      return () => observer.disconnect()
    }

    const onScroll = () => {
      if (info) {
        const rect = info.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setInfoVisible(true)
        }
      }
      if (image) {
        const rect = image.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setImageVisible(true)
        }
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!infoVisible || statsAnimatedRef.current) return
    statsAnimatedRef.current = true

    const durationMs = 1800
    const targets = stats.map(stat => stat.value)
    const exponents = stats.map(stat => (stat.value >= 100 ? 0.75 : 1.25))
    const start = performance.now()
    let rafId = 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      const nextValues = targets.map((target, index) => {
        const eased = Math.pow(progress, exponents[index])
        return Math.round(target * eased)
      })
      setStatValues(nextValues)

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick)
      }
    }

    rafId = window.requestAnimationFrame(tick)
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [infoVisible])

  const renderWords = (
    words: string[],
    visible: boolean,
    startDelay: number,
    step: number,
    keyPrefix: string
  ) =>
    words.map((word, index) => (
      <span
        key={`${keyPrefix}-${word}-${index}`}
        className={`about-intro-word ${
          visible ? 'about-intro-word--visible' : ''
        }`}
        style={{
          transitionDelay: `${startDelay + index * step}ms`,
          animationDelay: `${startDelay + index * step}ms`
        }}
      >
        {word}
        {index < words.length - 1 ? '\u00A0' : ''}
      </span>
    ))

  return (
    <section
      className='who-am-i who-am-i-section'
      dir='rtl'
      aria-labelledby='who-am-i-title'
      data-logo-contrast='dark'
    >
      <div className='who-am-i-inner'>
        <h1 id='who-am-i-title' ref={titleRef} className='who-am-i-title'>
          {whoTitleWords.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={`about-intro-word ${
                titleVisible ? 'about-intro-word--visible' : ''
              }`}
              style={{
                transitionDelay: `${index * wordDelayMs}ms`,
                animationDelay: `${index * wordDelayMs}ms`
              }}
            >
              {word}
              {index < whoTitleWords.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>
        <div className='who-am-i-content'>
          <div
            ref={imageRef}
            className={`who-am-i-image-wrap ${
              imageVisible ? 'who-am-i-image-wrap--visible' : ''
            }`}
          >
            <img
              src={whoAmIImage}
              alt=''
              aria-hidden='true'
              className='who-am-i-image who-am-i-image--ghost who-am-i-image--ghost-a'
            />
            <img
              src={whoAmIImage}
              alt=''
              aria-hidden='true'
              className='who-am-i-image who-am-i-image--ghost who-am-i-image--ghost-b'
            />
            <img
              src={whoAmIImage}
              alt='صورة من أنا'
              className='who-am-i-image who-am-i-image--main'
            />
          </div>
          <div
            ref={infoRef}
            className={`who-am-i-info ${
              infoVisible ? 'who-am-i-info--visible' : ''
            }`}
          >
            <h2 className='who-am-i-certified'>
              {renderWords(
                certifiedTitleWords,
                infoVisible,
                0,
                26,
                'certified-title'
              )}
            </h2>
            <span className='who-am-i-subtext'>
              {renderWords(
                certifiedSubtitleWords,
                infoVisible,
                certifiedTitleWords.length * 26 + 120,
                14,
                'certified-subtext'
              )}
            </span>
            <div className='who-am-i-stats'>
              {stats.map((stat, statIndex) => {
                const statDelay = statIndex * 120
                const currentValue = statValues[statIndex] ?? 0
                const showSuffix = currentValue >= stat.value
                return (
                  <div
                    className='who-am-i-stat'
                    key={`${stat.value}-${statIndex}`}
                  >
                    <span
                      className={`who-am-i-stat-number about-intro-word ${
                        infoVisible ? 'about-intro-word--visible' : ''
                      }`}
                      style={{
                        transitionDelay: `${statDelay}ms`,
                        animationDelay: `${statDelay}ms`
                      }}
                    >
                      {currentValue}
                      {showSuffix ? stat.suffix : ''}
                    </span>
                    {stat.lines.map((line, lineIndex) => (
                      <span
                        className='who-am-i-stat-label'
                        key={`${stat.value}-${lineIndex}`}
                      >
                        {renderWords(
                          line.split(/\s+/),
                          infoVisible,
                          statDelay + 40 + lineIndex * 40,
                          18,
                          `stat-${statIndex}-line-${lineIndex}`
                        )}
                      </span>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoAmISection
