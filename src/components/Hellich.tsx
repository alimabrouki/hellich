// import profileImage from '../assets/images/hellich-hero-image.png'
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
            className={`hero relative z-10 min-h-screen flex items-center justify-center
            transition-opacity duration-300
            ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            {/* <img
              src={profileImage}
              alt='Trainer'
              className='absolute -top-40 right-40 -translate-x-1/1 w-[570px]'
            /> */}

            <p className='text-center text-5xl lg:text-7xl text-main-bleu font-cairo'>
              Elite Personal Training
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hellich
