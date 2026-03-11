import { useEffect, useRef } from 'react'
import { Link } from 'react-router'

const StartBtnDesktop: React.FC = () => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const pausedRef = useRef<boolean>(false) // track hover pause

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    let animationFrame: number
    let x = 0
    const speed = 0.5 // adjust speed

    // hover handlers
    const handleMouseEnter = () => (pausedRef.current = true)
    const handleMouseLeave = () => (pausedRef.current = false)

    content.addEventListener('mouseenter', handleMouseEnter)
    content.addEventListener('mouseleave', handleMouseLeave)

    const animate = () => {
      if (!pausedRef.current) {
        x -= speed
        const halfWidth = content.scrollWidth / 2

        if (Math.abs(x) >= halfWidth) {
          x = 0
        }

        content.style.transform = `translateX(${x}px)`
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
      content.removeEventListener('mouseenter', handleMouseEnter)
      content.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const text = 'إبدأ الآن'

  return (
    <Link
      to='/'
      className='hidden lg:flex overflow-hidden rounded-2xl bg-head-btn font-bold lg:my-2 lg:ml-5'
    >
      <div className='w-28.75 overflow-hidden py-2'>
        <div ref={contentRef} className='flex will-change-transform'>
          {/* First group */}
          <div className='flex shrink-0'>
            {[...Array(3)].map((_, i) => (
              <span key={`a-${i}`} className='mx-3 whitespace-nowrap'>
                {text}
              </span>
            ))}
          </div>

          {/* Duplicate group */}
          <div className='flex shrink-0'>
            {[...Array(3)].map((_, i) => (
              <span key={`b-${i}`} className='mx-3 whitespace-nowrap'>
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default StartBtnDesktop
