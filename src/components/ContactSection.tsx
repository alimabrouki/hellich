import { useEffect, useRef, useState } from 'react'
import '../styles/ContactSection.css'

const contactTitle = 'تواصل معي'
const contactTitleWords = contactTitle.split(/\s+/)
const wordDelayMs = 45

function ContactSection () {
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const socialsRef = useRef<HTMLDivElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [socialsVisible, setSocialsVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  )
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
                <svg viewBox='0 0 24 24' aria-hidden='true'>
                  <path
                    d='M20.52 3.48A11.78 11.78 0 0 0 12 1.02c-6.22 0-11.28 5.06-11.28 11.28 0 1.99.52 3.93 1.5 5.66L.95 23l5.17-1.35a11.23 11.23 0 0 0 5.88 1.59h.01c6.22 0 11.28-5.06 11.28-11.28 0-3.01-1.17-5.84-3.77-8.48zm-8.52 17.8h-.01a9.24 9.24 0 0 1-4.71-1.29l-.34-.2-3.07.8.82-2.99-.22-.35a9.25 9.25 0 1 1 7.53 3.99zm5.07-6.94c-.28-.14-1.65-.82-1.9-.91-.26-.1-.44-.14-.62.14-.18.28-.71.91-.88 1.09-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.38-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.47.1-.18.05-.35-.02-.5-.07-.14-.62-1.5-.85-2.06-.22-.54-.45-.47-.62-.48-.16-.01-.35-.01-.53-.01-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.28 0 1.34.99 2.64 1.13 2.82.14.18 1.95 2.98 4.72 4.18.66.28 1.17.45 1.57.57.66.2 1.26.17 1.73.1.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z'
                    fill='currentColor'
                  />
                </svg>
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
                <svg viewBox='0 0 24 24' aria-hidden='true'>
                  <path
                    d='M13.7 9.35V7.58c0-.9.6-1.1 1.02-1.1h2V4h-2.76c-2.56 0-3.14 1.9-3.14 3.12v2.23H8.6v2.78h2.22V20h2.88v-7.87h2.2l.34-2.78H13.7z'
                    fill='currentColor'
                  />
                </svg>
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
              <div className='contact-field'>
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
              <div className='contact-field'>
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
              <div className='contact-field'>
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
              <div className='contact-field'>
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
                  <div className='contact-field contact-field--compact'>
                    <label htmlFor='contact-weight'>الوزن</label>
                    <input
                      id='contact-weight'
                      name='weight'
                      type='number'
                      inputMode='decimal'
                      className='contact-input'
                      placeholder='مثال: 78 كجم'
                      required
                    />
                  </div>
                  <div className='contact-field contact-field--time-group'>
                    <label htmlFor='contact-free-time-from'>الوقت المناسب</label>
                    <div className='contact-time-row'>
                      <div className='contact-time-slot'>
                        <span className='contact-time-label'>من</span>
                        <input
                          id='contact-free-time-from'
                          name='freeTimeFrom'
                          type='number'
                          inputMode='numeric'
                          className='contact-input contact-input--time'
                          placeholder='5'
                          required
                        />
                      </div>
                      <div className='contact-time-slot'>
                        <span className='contact-time-label'>إلى</span>
                        <input
                          id='contact-free-time-to'
                          name='freeTimeTo'
                          type='number'
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
              <div className='contact-field contact-field--full'>
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
              className='contact-submit'
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
            >
              train with me
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
