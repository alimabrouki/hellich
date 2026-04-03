import { memo, useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import aliImage from '../assets/images/ali.png'
import '../styles/ContactSection.css'

const contactTitle = 'تواصل معي'
const contactTitleWords = contactTitle.split(/\s+/)
const wordDelayMs = 45
const footerTitle = 'HCILLEH'
const footerTitleLetters = footerTitle.split('')
const fieldRevealStepMs = 90
const revealStyle = (index: number): CSSProperties =>
  ({
    '--reveal-delay': `${index * fieldRevealStepMs}ms`
  } as CSSProperties)

function ContactSection () {
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const footerTitleRef = useRef<HTMLHeadingElement | null>(null)
  const socialsRef = useRef<HTMLDivElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [footerTitleVisible, setFooterTitleVisible] = useState(false)
  const [socialsVisible, setSocialsVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [visibleFields, setVisibleFields] = useState<Set<string>>(
    () => new Set()
  )
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle')
  const [statusMessage, setStatusMessage] = useState('')

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
        { threshold: 0.9 }
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

    const win = window as Window
    onScroll()
    win.addEventListener('scroll', onScroll, { passive: true })
    win.addEventListener('resize', onScroll)
    return () => {
      win.removeEventListener('scroll', onScroll)
      win.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const socials = socialsRef.current
    const form = formRef.current
    if (!socials && !form) return

    const reveal = (entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return
      if (entry.target === socials) setSocialsVisible(true)
      if (entry.target === form) setFormVisible(true)
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => reveal(entry))
        },
        { threshold: 0.35 }
      )

      if (socials) observer.observe(socials)
      if (form) observer.observe(form)
      return () => observer.disconnect()
    }

    const onScroll = () => {
      if (socials) {
        const rect = socials.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setSocialsVisible(true)
        }
      }
      if (form) {
        const rect = form.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setFormVisible(true)
        }
      }
    }

    const win = window as Window
    onScroll()
    win.addEventListener('scroll', onScroll, { passive: true })
    win.addEventListener('resize', onScroll)
    return () => {
      win.removeEventListener('scroll', onScroll)
      win.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!formVisible) return
    const form = formRef.current
    if (!form) return

    const targets = Array.from(
      form.querySelectorAll<HTMLElement>('[data-reveal-id]')
    )
    if (!targets.length) return

    const reveal = (target: HTMLElement) => {
      const id = target.dataset.revealId
      if (!id) return
      setVisibleFields(current => {
        if (current.has(id)) return current
        const next = new Set(current)
        next.add(id)
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

      targets.forEach(target => observer.observe(target))
      return () => observer.disconnect()
    }

    const onScroll = () => {
      const viewportHeight = window.innerHeight
      targets.forEach(target => {
        const rect = target.getBoundingClientRect()
        if (rect.top < viewportHeight && rect.bottom > 0) {
          reveal(target)
        }
      })
    }

    const win = window as Window
    onScroll()
    win.addEventListener('scroll', onScroll, { passive: true })
    win.addEventListener('resize', onScroll)
    return () => {
      win.removeEventListener('scroll', onScroll)
      win.removeEventListener('resize', onScroll)
    }
  }, [formVisible])

  useEffect(() => {
    const target = footerTitleRef.current
    if (!target) return

    let timeoutId: number | null = null
    let wasInView = false

    const triggerAnimation = () => {
      setFooterTitleVisible(false)
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
      timeoutId = window.setTimeout(() => {
        setFooterTitleVisible(true)
      }, 60)
    }

    const handleVisibility = (inView: boolean) => {
      if (inView && !wasInView) {
        triggerAnimation()
      } else if (!inView && wasInView) {
        setFooterTitleVisible(false)
      }
      wasInView = inView
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          handleVisibility(entry.isIntersecting)
        },
        { threshold: 0.45 }
      )
      observer.observe(target)
      return () => {
        observer.disconnect()
        if (timeoutId !== null) window.clearTimeout(timeoutId)
      }
    }

    const onScroll = () => {
      const rect = target.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      handleVisibility(inView)
    }

    const win = window as Window
    onScroll()
    win.addEventListener('scroll', onScroll, { passive: true })
    win.addEventListener('resize', onScroll)
    return () => {
      if (timeoutId !== null) window.clearTimeout(timeoutId)
      win.removeEventListener('scroll', onScroll)
      win.removeEventListener('resize', onScroll)
    }
  }, [])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget
      setStatus('sending')
      setStatusMessage('جارٍ إرسال رسالتك...')

      const data = new FormData(form)
      const name = String(data.get('name') ?? '').trim()
      const email = String(data.get('email') ?? '').trim()
      const age = String(data.get('age') ?? '').trim()
      const sex = String(data.get('sex') ?? '').trim()
      const weight = String(data.get('weight') ?? '').trim()
      const freeTimeFrom = String(data.get('freeTimeFrom') ?? '').trim()
      const freeTimeTo = String(data.get('freeTimeTo') ?? '').trim()
      const message = String(data.get('message') ?? '').trim()

      try {
        const API_URL = import.meta.env.DEV
          ? '/api/contact'
          : '/.netlify/functions/contact'
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            age,
            sex,
            weight,
            freeTimeFrom,
            freeTimeTo,
            message
          })
        })

        const payload = await response.json().catch(() => null)
        if (!response.ok) {
          throw new Error(
            payload && typeof payload === 'object' && 'error' in payload
              ? String(payload.error)
              : 'Failed to send'
          )
        }
        if (
          payload &&
          typeof payload === 'object' &&
          'ok' in payload &&
          payload.ok !== true
        ) {
          throw new Error('Failed to send')
        }

        setStatus('success')
        setStatusMessage('تم إرسال رسالتك بنجاح! سأرد عليك قريباً.')
        form.reset()
      } catch (error) {
        const rawMessage =
          error && typeof error === 'object' && 'message' in error
            ? String(error.message)
            : ''
        const showDetails =
          typeof import.meta !== 'undefined' &&
          import.meta.env &&
          import.meta.env.DEV
        setStatus('error')
        setStatusMessage(
          showDetails && rawMessage
            ? `تعذر إرسال الرسالة: ${rawMessage}`
            : 'تعذر إرسال الرسالة الآن. حاول مرة أخرى.'
        )
      }
    },
    []
  )

  return (
    <section
      className='contact-section'
      id='contact'
      dir='rtl'
      aria-labelledby='contact-title'
    >
      <div className='contact-inner'>
        <h1 id='contact-title' ref={titleRef} className='contact-title'>
          {contactTitleWords.map((word, index) => (
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
              {index < contactTitleWords.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </h1>
        <div className='contact-content'>
          <div
            ref={socialsRef}
            className={`contact-socials ${
              socialsVisible ? 'contact-socials--visible' : ''
            }`}
          >
            <a
              className='contact-social contact-social--whatsapp'
              href='https://wa.me/218948002493'
              target='_blank'
              rel='noreferrer'
              aria-label='واتساب'
            >
              <span className='contact-social__icon' aria-hidden='true'>
                <FontAwesomeIcon icon={faWhatsapp} />
              </span>
              <span className='contact-social__label'>واتساب</span>
            </a>
            <a
              className='contact-social contact-social--facebook'
              href='https://www.facebook.com/mhmd.hlysh.mbrwky#'
              target='_blank'
              rel='noreferrer'
              aria-label='فيسبوك'
            >
              <span className='contact-social__icon' aria-hidden='true'>
                <FontAwesomeIcon icon={faFacebookF} />
              </span>
              <span className='contact-social__label'>فيسبوك</span>
            </a>
          </div>
          <form
            ref={formRef}
            className={`contact-form ${
              formVisible ? 'contact-form--visible' : ''
            }`}
            onSubmit={handleSubmit}
          >
            <div className='contact-grid'>
              <div
                className={`contact-field contact-field--reveal ${
                  visibleFields.has('contact-name')
                    ? 'contact-field--visible'
                    : ''
                }`}
                style={revealStyle(0)}
                data-reveal-id='contact-name'
              >
                <label htmlFor='contact-name'>الاسم الكامل</label>
                <input
                  id='contact-name'
                  name='name'
                  type='text'
                  className='contact-input'
                  placeholder='اكتب اسمك'
                  required
                />
              </div>
              <div
                className={`contact-field contact-field--reveal ${
                  visibleFields.has('contact-email')
                    ? 'contact-field--visible'
                    : ''
                }`}
                style={revealStyle(1)}
                data-reveal-id='contact-email'
              >
                <label htmlFor='contact-email'>البريد الإلكتروني</label>
                <input
                  id='contact-email'
                  name='email'
                  type='email'
                  className='contact-input'
                  placeholder='example@email.com'
                  required
                />
              </div>
              <div
                className={`contact-field contact-field--reveal ${
                  visibleFields.has('contact-age')
                    ? 'contact-field--visible'
                    : ''
                }`}
                style={revealStyle(2)}
                data-reveal-id='contact-age'
              >
                <label htmlFor='contact-age'>العمر</label>
                <input
                  id='contact-age'
                  name='age'
                  type='number'
                  inputMode='numeric'
                  className='contact-input'
                  placeholder='مثال: 25'
                  required
                />
              </div>
              <div
                className={`contact-field contact-field--reveal ${
                  visibleFields.has('contact-sex')
                    ? 'contact-field--visible'
                    : ''
                }`}
                style={revealStyle(3)}
                data-reveal-id='contact-sex'
              >
                <label htmlFor='contact-sex'>الجنس</label>
                <select
                  id='contact-sex'
                  name='sex'
                  className='contact-select'
                  required
                >
                  <option value='' disabled>
                    اختر
                  </option>
                  <option value='ذكر'>ذكر</option>
                  <option value='أنثى'>أنثى</option>
                  <option value='آخر'>آخر</option>
                </select>
              </div>
              <div className='contact-field contact-field--full'>
                <div className='contact-row contact-row--time-weight'>
                  <div
                    className={`contact-field contact-field--compact contact-field--reveal ${
                      visibleFields.has('contact-weight')
                        ? 'contact-field--visible'
                        : ''
                    }`}
                    style={revealStyle(4)}
                    data-reveal-id='contact-weight'
                  >
                    <label htmlFor='contact-weight'>الوزن</label>
                    <input
                      id='contact-weight'
                      name='weight'
                      type='number'
                      inputMode='decimal'
                      className='contact-input'
                      placeholder='مثال: 78 كج'
                      required
                    />
                  </div>
                  <div
                    className={`contact-field contact-field--time-group contact-field--reveal ${
                      visibleFields.has('contact-time-group')
                        ? 'contact-field--visible'
                        : ''
                    }`}
                    style={revealStyle(5)}
                    data-reveal-id='contact-time-group'
                  >
                    <label htmlFor='contact-free-time-from'>
                      الوقت المناسب
                    </label>
                    <div className='contact-time-row'>
                      <div
                        className={`contact-time-slot contact-time-slot--reveal ${
                          visibleFields.has('contact-free-time-from')
                            ? 'contact-time-slot--visible'
                            : ''
                        }`}
                        style={revealStyle(6)}
                        data-reveal-id='contact-free-time-from'
                      >
                        <span className='contact-time-label'>من</span>
                        <input
                          id='contact-free-time-from'
                          name='freeTimeFrom'
                          type='number'
                          min='1'
                          max='12'
                          inputMode='numeric'
                          className='contact-input contact-input--time'
                          placeholder='5'
                          required
                        />
                      </div>
                      <div
                        className={`contact-time-slot contact-time-slot--reveal ${
                          visibleFields.has('contact-free-time-to')
                            ? 'contact-time-slot--visible'
                            : ''
                        }`}
                        style={revealStyle(7)}
                        data-reveal-id='contact-free-time-to'
                      >
                        <span className='contact-time-label'>إلى</span>
                        <input
                          id='contact-free-time-to'
                          name='freeTimeTo'
                          type='number'
                          min='1'
                          max='12'
                          inputMode='numeric'
                          className='contact-input contact-input--time'
                          placeholder='7'
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`contact-field contact-field--full contact-field--reveal ${
                  visibleFields.has('contact-message')
                    ? 'contact-field--visible'
                    : ''
                }`}
                style={revealStyle(8)}
                data-reveal-id='contact-message'
              >
                <label htmlFor='contact-message'>رسالتك</label>
                <textarea
                  id='contact-message'
                  name='message'
                  className='contact-textarea'
                  placeholder='اكتب تفاصيل هدفك والتزامك...'
                  rows={5}
                  required
                />
              </div>
            </div>
            <button
              type='submit'
              className={`contact-submit contact-submit--reveal ${
                visibleFields.has('contact-submit')
                  ? 'contact-submit--visible'
                  : ''
              }`}
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
              style={revealStyle(9)}
              data-reveal-id='contact-submit'
            >
              تدرّب معي
            </button>
            {status !== 'idle' && (
              <p
                className={`contact-status contact-status--${status}`}
                role='status'
                aria-live='polite'
              >
                {statusMessage}
              </p>
            )}
          </form>
        </div>
      </div>
      <footer className='contact-footer' id='footer' aria-label='footer'>
        <div className='contact-footer-inner'>
          <h2
            ref={footerTitleRef}
            className='contact-footer-title'
            aria-label={footerTitle}
          >
            {footerTitleLetters.map((letter, index) => (
              <span
                key={`footer-${letter}-${index}`}
                className={`about-intro-word ${
                  footerTitleVisible ? 'about-intro-word--visible' : ''
                }`}
                style={{
                  transitionDelay: `${index * wordDelayMs}ms`,
                  animationDelay: `${index * wordDelayMs}ms`
                }}
              >
                {letter}
              </span>
            ))}
          </h2>
        </div>
        <div className='contact-footer-corners '>
          <span className='contact-footer-corner contact-footer-corner--left font-jetbrains'>
            <span className='contact-footer-copy' aria-hidden='true'>
              ©
            </span>
            2026 Hellich
          </span>
          <span className='contact-footer-corner contact-footer-corner--right font-jetbrains'>
            by{' '}
            <a
              className='contact-footer-link '
              href='https://wa.me/21652213767'
              target='_blank'
              rel='noreferrer'
              aria-label='WhatsApp ALI'
            >
              <span className='font-jetbrains'>ALI</span>
              <img
                className='contact-footer-ali'
                src={aliImage}
                alt=''
                aria-hidden='true'
              />
            </a>
          </span>
        </div>
        <div className='contact-footer-fog contact-footer-fog--base' />
        <div className='contact-footer-fog contact-footer-fog--glow' />
      </footer>
    </section>
  )
}

export default memo(ContactSection)
