import profileImage from '../assets/images/hellich-hero-image.png'
import '../App.css'
import Header from './header/Header'
import { useEffect, useState } from 'react'
import MobileMenu from './MobileMenu'

function Hellich () {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style = 'overflow:hidden'
    } else {
      document.body.style = ''
    }
  }, [menuOpen])

  const handleMenuOpen = (state: boolean) => {
    setMenuOpen(state)
  }
  return (
    <>
      <div className='wrapper'>
        <div className='hellich relative pt-8 lg:rounded-2xl'>
          <Header menuOpen={menuOpen} handleMenuOpen={handleMenuOpen} />

          <MobileMenu menuOpen={menuOpen} />

          <div
            className={`hero relative bottom-20 isolate overflow-hidden flex flex-col items-center
  transition-opacity duration-300
  ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            {/* Image */}
            <div className='w-full flex justify-center pt-10'>
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
              className='
      text-center
      text-4xl sm:text-5xl lg:text-6xl
      text-head-btn
      font-cairo
      font-black
      text-[75px]
      z-10
      mb-20
    '
            >
              تدريب مبني على فهم حقيقي
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
        </div>
      </div>
    </>
  )
}

export default Hellich
