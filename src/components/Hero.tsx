import type { menuProps } from '../types/menuProps'
import profileImage from '../assets/images/hellich-hero-image.png'
import { useEffect, useState } from 'react'
import HeroTitle from './HeroTitle'

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
      className={`hero sticky min-h-screen min-h-[100dvh] overflow-visible flex flex-col px-2 pt-4 sm:px-4 md:px-8 lg:px-12
      transition-opacity duration-300
      ${menuOpen ? 'opacity-100 pointer-events-none' : 'opacity-100'}`}
    >
      <div className='relative z-20 ml-auto w-full max-w-none lg:max-w-[980px]'>
        <HeroTitle />
      </div>
      {/* IMAGE */}
      <div
        className={`
    relative z-30 bottom-[70px] right-[10px] -mt-10 md:-mt-16 lg:-mt-20
    transform transition-all duration-900 ease-out
    ${animate ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
  `}
      >
        <img
          src={profileImage}
          alt='Trainer'
          className='
          w-[80%] max-w-2xl object-contain
          [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]
    '
        />
      </div>

      {/* Bottom-of-screen fog */}
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
