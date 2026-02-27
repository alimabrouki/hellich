import '../App.css'
import Header from './header/Header'
import { useEffect, useState } from 'react'
import MobileMenu from './MobileMenu'
import Hero from './Hero'

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

          <Hero menuOpen={menuOpen} />
          <div className='about'>
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
