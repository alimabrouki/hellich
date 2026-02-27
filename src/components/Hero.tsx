import type { menuProps } from '../types/menuProps'
import profileImage from '../assets/images/hellich-hero-image.png'
import { useEffect, useState } from 'react'
import { Dot } from 'lucide-react'

const Phrase = () => (
  <div className='flex shrink-0 items-center'>
    <span className='mx-10 flex items-center'>
      حقيقي
      <Dot className='mx-6' strokeWidth={20} /> فهم
      <Dot className='mx-6' strokeWidth={20} />
      على <Dot className='mx-6' strokeWidth={20} />
      مبني <Dot className='mx-6' strokeWidth={20} />
      تدريب
    </span>
  </div>
)

function Hero ({ menuOpen }: menuProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`hero relative bottom-20 overflow-hidden flex flex-col items-center
      transition-opacity duration-300
      ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* IMAGE */}
      <div
        className={`
    relative w-full mb-[333px] flex justify-center pt-10
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

        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <div className='marquee-wrapper'>
            <div
              className='marquee-track
      mix-blend-exclusion
      whitespace-nowrap
      font-cairo
      font-black
      text-[80px] sm:text-[120px] lg:text-[160px]
      text-pappay
    '
            >
              <Phrase />
              <Phrase />
            </div>
          </div>
        </div>
      </div>

      {/* GRADIENT */}
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
