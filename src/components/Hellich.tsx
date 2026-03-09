import '../App.css'

import { useEffect, useState } from 'react'
import MobileMenu from './MobileMenu'
import Hero from './Hero'
import Header from './header/Header'

function Hellich () {
  const [menuOpen, setMenuOpen] = useState(false)

  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

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
        <div className='hellich relative lg:rounded-2xl'>
          <MobileMenu menuOpen={menuOpen} />
          <Header
            animate={animate}
            menuOpen={menuOpen}
            handleMenuOpen={handleMenuOpen}
          />
          <Hero animate={animate} />
          <div className='about relative z-10 min-h-svh bg-second-bg'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, fugit
            minima possimus suscipit eveniet cum quod libero placeat totam ea
            ipsa impedit soluta quas nisi non! Nobis officiis cum beatae. Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Vel, fugit
            minima possimus suscipit eveniet cum quod libero placeat totam ea
            ipsa impedit soluta quas nisi non! Nobis officiis cum beatae. Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Vel, fugit
            minima possimus suscipit eveniet cum quod libero placeat totam ea
            ipsa impedit soluta quas nisi non! Nobis officiis cum beatae. Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Vel, fugit
            minima possimus suscipit eveniet cum quod libero placeat totam ea
            ipsa impedit soluta quas nisi non! Nobis officiis cum beatae. Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Vel, fugit
            minima possimus suscipit eveniet cum quod libero placeat totam ea
            ipsa impedit soluta quas nisi non! Nobis officiis cum beatae.
          </div>
        </div>
      </div>
    </>
  )
}

export default Hellich
