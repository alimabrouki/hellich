import profileImage from '../assets/images/hellich-hero-image.png'
import HeroTitle from './HeroTitle'

function Hero () {
  return (
    <>
      <div
        className='hero relative overflow-visible flex flex-col px-2 sm:px-4 md:px-8 lg:px-12 lg:pt-28
      transition-opacity duration-300 opacity-100'
      >
        <div className='hero-container'>
          <div className='relative z-20 ml-auto w-full max-w-none lg:max-w-[980px]'>
            <HeroTitle />
          </div>
          <span>سيبستبتشبخ سشخبتسي تشخب سيبتبىسشب شبست</span>
        </div>
        {/* IMAGE */}

        <img
          src={profileImage}
          alt='Trainer'
          className={`translate-y-[60%] left-1.25  w-[80%] max-[400px]:w-[70%] max-[479px]:w-[75%] max-w-2xl object-contain
          mask-[linear-gradient(to_bottom,black_70%,transparent_100%)]
    absolute
     z-30 -mt-10 md:-mt-16 lg:-mt-20
    
  `}
        />

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
    </>
  )
}

export default Hero
