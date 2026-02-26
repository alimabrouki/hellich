import type { menuProps } from '../utils/menuProps'
import profileImage from '../assets/images/hellich-hero-image.png'
import { useEffect, useState } from 'react'

function Hero ({ menuOpen }: menuProps) {
  const fullText = 'تدريب مبني على فهم حقيقي'

  const [displayedText, setDisplayedText] = useState('')
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!animate) return

    let index = 0

    const typing = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1))
      index++

      if (index === fullText.length) {
        clearInterval(typing)
      }
    }, 100) // typing speed

    return () => clearInterval(typing)
  }, [animate])
  return (
    <div
      className={`hero relative bottom-20 isolate overflow-hidden flex flex-col items-center
  transition-opacity duration-300
  ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Image */}
      <div
        className={`
        w-full flex justify-center pt-10
        transform transition-all duration-900 ease-out
        ${animate ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
  `}
      >
        <img
          src={profileImage}
          alt='Trainer'
          className='
      w-[85%] max-w-2xl object-contain
      [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]
    '
        />
      </div>
      <h1
        className={`
            text-center
            text-4xl sm:text-5xl lg:text-6xl
            text-pappay
            font-cairo
            font-black
            text-[75px]
            z-10
            mb-20
            transform transition-all duration-700 ease-out delay-300
            ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }
          `}
      >
        {displayedText}
      </h1>

      <div
        className='
      pointer-events-none absolute bottom-0 left-0 right-0 z-0
      h-[64%] lg:h-[45%]
      bg-gradient-to-t
      from-[#03a6db]
      via-[#03a6db]/70
      to-transparent
    '
      />

      <div
        className='
      hidden lg:block
      pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2
      w-[60%] h-[25%]
      bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#03a6db_90%)]
      blur-2xl
    '
      />
    </div>
  )
}

export default Hero
