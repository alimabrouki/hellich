import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import '../styles/WhoAmISection.css'
import { faFacebookF, faTiktok } from '@fortawesome/free-brands-svg-icons'
import whoAmIImage from '../assets/images/who-am-i.jpg'
import tiktokVideo from '../assets/videos/tiktok.mp4'
import facebookVideo from '../assets/videos/facebook.mp4'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const whoTitle = 'من أنا ؟'
const whoTitleWords = whoTitle.split(/\s+/)
const wordDelayMs = 45
const faqTitle = 'عندك أسألة ؟'
const faqTitleWords = faqTitle.split(/\s+/)
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

const faqRevealStepMs = 90
const faqRevealStyle = (index: number): CSSProperties =>
  ({
    '--reveal-delay': `${index * faqRevealStepMs}ms`
  } as CSSProperties)

const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
const toArabicNumber = (value: number) =>
  String(value)
    .split('')
    .map(char =>
      char >= '0' && char <= '9' ? arabicDigits[Number(char)] : char
    )
    .join('')

const faqs = [
  {
    question: 'هل يجب أن أكون في فورما قبل أن أبدأ؟',
    answer:
      'ج: لا، بالعكس. التدريب مصمم لكل المستويات، سواء كنت مبتدئ تماماً أو لديك خبرة سابقة.\nهدفي هو أن آخذك من مستواك الحالي إلى أفضل نسخة منك، خطوة بخطوة وبطريقة آمنة وفعالة.'
  },
  {
    question: 'هل التدريب مناسب للمبتدئين؟',
    answer:
      ' نعم، ومصمم خصيصاً لهم أيضاً.\nأغلب الأشخاص الذين أعمل معهم يبدأون من الصفر، ويتم توجيههم بشكل تدريجي لبناء الأساس الصحيح في التمرين، التقنية، والانضباط.\nالبداية الصحيحة هي أهم خطوة، وأنا أضمن أنك تبدأ بالطريقة الصح.'
  },
  {
    question: 'هل توفر نظام غذائي؟',
    answer:
      ' نعم. أقدم لك 4 برامج تدريب و4 برامج تغذية مجاناً لتبدأ بشكل قوي ومنظم.\nوإذا كنت تبحث عن مستوى أعلى وتخصيص أدق حسب أهدافك وتفاصيل جسمك، يمكنك الحصول على برنامج متقدم مدفوع يتم تصميمه خصيصاً لك.'
  },
  {
    question: 'كم من الوقت أحتاج حتى أرى نتائج؟',
    answer:
      ' إذا كنت تتدرب بشكل طبيعي (بدون أي منشطات)، يمكنك ملاحظة نتائج واضحة خلال 3 إلى 6 أشهر من الالتزام.\nأما في حال استخدام الهرمونات، فقد تبدأ النتائج بالظهور خلال شهر واحد.\nلكن خلّيها واضحة: النتائج تعتمد أولاً وأخيراً على التزامك أنت، سواء في التمرين أو التغذية أو نمط حياتك.'
  },
  {
    question: 'هل هناك أشخاص لا يمكنك تدريبهم؟',
    answer:
      ' نعم. لا أعمل مع الأشخاص غير الملتزمين بالمواعيد أو الذين لا يحترمون وقت الحصة.\nالانضباط جزء أساسي من النجاح، وإذا لم تكن جاداً في التزامك، فلن تحصل على نتائج — وبالتالي هذا النوع من التدريب ليس مناسباً لك.'
  },
  {
    question: 'كم سعر الحصة التدريبية؟',
    answer:
      ' سعر الحصة هو 20 دينار ليبي.\nهذا يشمل تدريب شخصي مخصص بالكامل حسب مستواك وأهدافك، مع متابعة مستمرة لضمان تحقيق أفضل النتائج في أقصر وقت ممكن.'
  },
  {
    question: 'ماذا أحتاج قبل أن أبدأ؟',
    answer:
      ' قبل بدء التدريب، أقوم بتقييم شامل لحالتك البدنية، يشمل:\n\nفحص وضعية الجسم (Posture)\nتقييم المفاصل والحركة\nمعرفة طبيعة عملك (نشِط أم مكتبي)\nالاطلاع على حالتك الصحية، بما في ذلك أي أمراض مزمنة\n\nبناءً على هذا التقييم، يتم تصميم برنامج تدريبي مناسب لك 100%.'
  }
]
function WhoAmISection () {
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const infoRef = useRef<HTMLDivElement | null>(null)
  const socialsRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const faqTitleRef = useRef<HTMLHeadingElement | null>(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [infoVisible, setInfoVisible] = useState(false)
  const [socialsVisible, setSocialsVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const [faqTitleVisible, setFaqTitleVisible] = useState(false)
  const [faqItemsVisible, setFaqItemsVisible] = useState<boolean[]>(() =>
    faqs.map(() => false)
  )
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const faqItemRefs = useRef<(HTMLDivElement | null)[]>([])
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
    const socials = socialsRef.current
    const image = imageRef.current
    const faqTitleEl = faqTitleRef.current
    if (!info && !socials && !image && !faqTitleEl) return

    const reveal = (entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return
      if (entry.target === info) setInfoVisible(true)
      if (entry.target === socials) setSocialsVisible(true)
      if (entry.target === image) setImageVisible(true)
      if (entry.target === faqTitleEl) setFaqTitleVisible(true)
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => reveal(entry))
        },
        { threshold: 0 }
      )

      if (info) observer.observe(info)
      if (socials) observer.observe(socials)
      if (image) observer.observe(image)
      if (faqTitleEl) observer.observe(faqTitleEl)
      return () => observer.disconnect()
    }

    const onScroll = () => {
      if (info) {
        const rect = info.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setInfoVisible(true)
        }
      }
      if (socials) {
        const rect = socials.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setSocialsVisible(true)
        }
      }
      if (image) {
        const rect = image.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setImageVisible(true)
        }
      }
      if (faqTitleEl) {
        const rect = faqTitleEl.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setFaqTitleVisible(true)
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
    const items = faqItemRefs.current.filter((item): item is HTMLDivElement =>
      Boolean(item)
    )
    if (!items.length) return

    const reveal = (target: HTMLElement) => {
      const index = Number(target.dataset.faqIndex)
      if (Number.isNaN(index)) return
      setFaqItemsVisible(current => {
        if (current[index]) return current
        const next = [...current]
        next[index] = true
        return next
      })
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return
            reveal(entry.target as HTMLElement)
            observer.unobserve(entry.target)
          })
        },
        { threshold: 0.3 }
      )

      items.forEach(item => observer.observe(item))
      return () => observer.disconnect()
    }

    const onScroll = () => {
      const viewportHeight = window.innerHeight
      items.forEach(item => {
        const rect = item.getBoundingClientRect()
        if (rect.top < viewportHeight && rect.bottom > 0) {
          reveal(item)
        }
      })
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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(current => (current === index ? null : index))
  }

  return (
    <section
      className='who-am-i who-am-i-section'
      id='who-am-i'
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
        <div
          ref={socialsRef}
          className={`who-am-i-socials ${
            socialsVisible ? 'who-am-i-socials--visible' : ''
          }`}
        >
          <a
            className='social-card social-card--tiktok'
            href='https://www.tiktok.com/@coach.hellich'
            target='_blank'
            rel='noreferrer'
            aria-label='تيك توك'
          >
            <video
              className='social-card__video'
              src={tiktokVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            <span className='social-card__overlay' aria-hidden='true' />
            <span className='social-card__icon' aria-hidden='true'>
              <FontAwesomeIcon icon={faTiktok} />
            </span>
          </a>
          <a
            className='social-card social-card--facebook'
            href='https://www.facebook.com/mhmd.hlysh.mbrwky#'
            target='_blank'
            rel='noreferrer'
            aria-label='فيسبوك'
          >
            <video
              className='social-card__video'
              src={facebookVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            <span className='social-card__overlay' aria-hidden='true' />
            <span className='social-card__icon' aria-hidden='true'>
              <FontAwesomeIcon icon={faFacebookF} />
            </span>
          </a>
        </div>
        <div className='who-am-i-faqs' aria-label='الأسئلة الشائعة'>
          <h2 ref={faqTitleRef} className='who-am-i-faqs-title'>
            {renderWords(faqTitleWords, faqTitleVisible, 0, wordDelayMs, 'faq')}
          </h2>
          <div className='who-am-i-faqs-list'>
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div
                  key={`${faq.question}-${index}`}
                  className={`who-am-i-faq ${
                    isOpen ? 'who-am-i-faq--open' : ''
                  } ${faqItemsVisible[index] ? 'who-am-i-faq--visible' : ''}`}
                  style={faqRevealStyle(index)}
                  data-faq-index={index}
                  ref={element => {
                    faqItemRefs.current[index] = element
                  }}
                >
                  <button
                    type='button'
                    className='who-am-i-faq-button'
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <span className='who-am-i-faq-text'>
                      <span className='who-am-i-faq-number'>
                        السؤال {toArabicNumber(index + 1)}
                      </span>
                      <span className='who-am-i-faq-question'>
                        {faq.question}
                      </span>
                    </span>
                    <span className='who-am-i-faq-icon' aria-hidden='true'>
                      <span className='who-am-i-faq-arrow' />
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${index}`}
                    className='who-am-i-faq-panel'
                    role='region'
                    aria-hidden={!isOpen}
                  >
                    <p className='who-am-i-faq-answer'>{faq.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoAmISection
