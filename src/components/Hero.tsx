import profileImage from '../assets/images/hellich-hero-image.png'
import type { animate } from '../types/types'
import HeroTitle from './HeroTitle'

function Hero ({ animate }: animate) {
  return (
    <>
      <div
        className='hero sticky top-0 overflow-visible flex flex-col px-2 sm:px-4 md:px-8 lg:px-12 lg:pt-28
      transition-opacity duration-300 opacity-100'
      >
        <div className='hero-container flex flex-col justify-between'>
          <div className='relative flexx  z-20'>
            <HeroTitle animate={animate} />
          </div>
          <div
            className={`hero-footer lg:flex-row justify-between flex gap-8 pr-2.5 flex-col z-30 align-baseline
          origin-bottom transform-gpu will-change-transform
          transition-[transform,opacity,filter] duration-[1120ms]
          [transition-timing-function:cubic-bezier(0.2,1.1,0.32,1)]
          ${
            animate
              ? 'translate-y-0 opacity-100 blur-0 rotate-0'
              : 'translate-y-[118%] opacity-0 blur-[8px] -rotate-[1.2deg]'
          }`}
            style={{ transitionDelay: animate ? '200ms' : '0ms' }}
          >
            <span className='text-xl  text-end'>تدريب مبني على فهم حقيقي</span>
            <span className='text-xl  text-end'>( إنزل للأسفل لترى كيف )</span>
          </div>
        </div>
        {/* IMAGE */}

        <img
          src={profileImage}
          alt='Trainer'
          className={`translate-y-[60%] lg:translate-x-[60%] lg:w-[30%] left-1.25 sm:w-[55%] md:w-[60%] min-[850px]:translate-y-[30%] w-[80%] max-[400px]:w-[70%] max-[479px]:w-[75%] object-contain
          mask-[linear-gradient(to_bottom,black_70%,transparent_100%)]
    absolute
     z-30 
    
  `}
        />

        {/* Bottom-of-screen fog */}
        <div
          className=' max-[350px]:h-[55%]
    pointer-events-none absolute bottom-0 left-0 right-0 z-0
          h-[40%] lg:h-[45%]
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
    </>
  )
}

export default Hero
