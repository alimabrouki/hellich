import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import '../styles/ContactSection.css'

const contactTitle = 'تواصل معي'
const contactTitleWords = contactTitle.split(/\s+/)
const wordDelayMs = 45
const fieldRevealStepMs = 90
const revealStyle = (index: number): CSSProperties =>
  ({
    '--reveal-delay': `${index * fieldRevealStepMs}ms`
  } as CSSProperties)

function ContactSection () {
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const socialsRef = useRef<HTMLDivElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [socialsVisible, setSocialsVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
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

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      const response = await fetch('/api/contact', {
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
  }

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
                className='contact-field contact-field--reveal'
                style={revealStyle(0)}
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
                className='contact-field contact-field--reveal'
                style={revealStyle(1)}
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
                className='contact-field contact-field--reveal'
                style={revealStyle(2)}
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
                className='contact-field contact-field--reveal'
                style={revealStyle(3)}
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
                    className='contact-field contact-field--compact contact-field--reveal'
                    style={revealStyle(4)}
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
                    className='contact-field contact-field--time-group contact-field--reveal'
                    style={revealStyle(5)}
                  >
                    <label htmlFor='contact-free-time-from'>
                      الوقت المناسب
                    </label>
                    <div className='contact-time-row'>
                      <div
                        className='contact-time-slot contact-time-slot--reveal'
                        style={revealStyle(6)}
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
                        className='contact-time-slot contact-time-slot--reveal'
                        style={revealStyle(7)}
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
                className='contact-field contact-field--full contact-field--reveal'
                style={revealStyle(8)}
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
              className='contact-submit contact-submit--reveal'
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
              style={revealStyle(9)}
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
    </section>
  )
}

export default ContactSection
