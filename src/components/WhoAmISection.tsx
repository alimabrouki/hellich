import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import '../styles/WhoAmISection.css'
import whoAmIImage from '../assets/images/who-am-i.jpg'
import tiktokVideo from '../assets/videos/tiktok.mp4'
import facebookVideo from '../assets/videos/facebook.mp4'

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
  const faqsRef = useRef<HTMLDivElement | null>(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [infoVisible, setInfoVisible] = useState(false)
  const [socialsVisible, setSocialsVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const [faqTitleVisible, setFaqTitleVisible] = useState(false)
  const [faqsVisible, setFaqsVisible] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
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
    const faqsEl = faqsRef.current
    if (!info && !socials && !image && !faqTitleEl && !faqsEl) return

    const reveal = (entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return
      if (entry.target === info) setInfoVisible(true)
      if (entry.target === socials) setSocialsVisible(true)
      if (entry.target === image) setImageVisible(true)
      if (entry.target === faqTitleEl) setFaqTitleVisible(true)
      if (entry.target === faqsEl) setFaqsVisible(true)
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
      if (faqsEl) observer.observe(faqsEl)
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
      if (faqsEl) {
        const rect = faqsEl.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setFaqsVisible(true)
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
              <svg viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  d='M20.53 8.33c-1.83-.1-3.34-.95-4.37-2.08-1.03-1.12-1.5-2.4-1.62-3.12h-3.1v12.1c0 1.46-1.2 2.64-2.68 2.64-1.48 0-2.68-1.18-2.68-2.64s1.2-2.64 2.68-2.64c.3 0 .59.05.86.13V9.5c-.3-.04-.61-.06-.92-.06C6.08 9.44 4 11.47 4 14.03c0 2.58 2.1 4.66 4.68 4.66 2.58 0 4.68-2.08 4.68-4.66V9.97c.88.67 2.1 1.16 3.9 1.2V8.33h-.73z'
                  fill='currentColor'
                />
              </svg>
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
              <svg viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  d='M13.7 9.35V7.58c0-.9.6-1.1 1.02-1.1h2V4h-2.76c-2.56 0-3.14 1.9-3.14 3.12v2.23H8.6v2.78h2.22V20h2.88v-7.87h2.2l.34-2.78H13.7z'
                  fill='currentColor'
                />
              </svg>
            </span>
          </a>
        </div>
        <div
          ref={faqsRef}
          className={`who-am-i-faqs ${
            faqsVisible ? 'who-am-i-faqs--visible' : ''
          }`}
          aria-label='الأسئلة الشائعة'
        >
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
                  }`}
                  style={faqRevealStyle(index)}
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
