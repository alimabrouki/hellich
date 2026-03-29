import { useEffect, useRef, useState } from 'react'
import './WhoAmISection.css'
import whoAmIImage from '../assets/images/who-am-i.jpg'

const whoTitle = 'من أنا ؟'
const whoTitleWords = whoTitle.split(/\s+/)
const wordDelayMs = 45

function WhoAmISection () {
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const [titleVisible, setTitleVisible] = useState(false)

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

  return (
    <section
      className='who-am-i who-am-i-section'
      dir='rtl'
      aria-labelledby='who-am-i-title'
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
          <div className='who-am-i-image-wrap'>
            <img
              src={whoAmIImage}
              alt='صورة من أنا'
              className='who-am-i-image'
            />
          </div>
          <div className='who-am-i-info'>
            <h2 className='who-am-i-certified'>معتمد</h2>
            <div className='who-am-i-stats'>
              <div className='who-am-i-stat'>
                <span className='who-am-i-stat-number'>4+</span>
                <span className='who-am-i-stat-label'>سنوات</span>
                <span className='who-am-i-stat-label'>خبرة</span>
              </div>
              <div className='who-am-i-stat'>
                <span className='who-am-i-stat-number'>150</span>
                <span className='who-am-i-stat-label'>عملاء سعداء</span>
              </div>
              <div className='who-am-i-stat'>
                <span className='who-am-i-stat-number'>200+</span>
                <span className='who-am-i-stat-label'>جلسات مكتملة</span>
              </div>
              <div className='who-am-i-stat'>
                <span className='who-am-i-stat-number'>15+</span>
                <span className='who-am-i-stat-label'>برامج مخصصة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoAmISection
