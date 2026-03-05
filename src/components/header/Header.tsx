import { useEffect, useRef, useState } from 'react'
import type { handleMenuProps, menuProps } from '../../types/menuProps'
import HeadLinks from './HeadLinks'
import Logo from './Logo'
import MenuButton from './MenuButton'
import StartBtnDesktop from './StartBtnDesktop'

function Header ({ menuOpen, handleMenuOpen }: menuProps & handleMenuProps) {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const isTicking = useRef(false)
  const downDistance = useRef(0)
  const upDistance = useRef(0)

  useEffect(() => {
    if (menuOpen) {
      setIsVisible(true)
    }
  }, [menuOpen])

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const onScroll = () => {
      const currentScrollY = window.scrollY

      if (isTicking.current) {
        return
      }

      isTicking.current = true
      window.requestAnimationFrame(() => {
        const delta = currentScrollY - lastScrollY.current

        if (menuOpen) {
          setIsVisible(true)
          downDistance.current = 0
          upDistance.current = 0
        } else if (currentScrollY <= 24) {
          setIsVisible(true)
          downDistance.current = 0
          upDistance.current = 0
        } else if (delta > 0) {
          downDistance.current += delta
          upDistance.current = 0

          // Hide only after meaningful downward travel to avoid jitter.
          if (downDistance.current >= 28) {
            setIsVisible(false)
          }
        } else if (delta < 0) {
          upDistance.current += Math.abs(delta)
          downDistance.current = 0

          // Reveal sooner on upward scroll for responsive navigation.
          if (upDistance.current >= 12) {
            setIsVisible(true)
          }
        }

        lastScrollY.current = currentScrollY
        isTicking.current = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  return (
    <div
      className={`header h-[86px] 
         py-4 left-0 right-0 z-50 px-2 sm:px-4 md:px-8 lg:px-12
      transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
      ${isVisible ? 'translate-y-0' : '-translate-y-[140%]'}`}
    >
      <div className='head flex justify-end lg:bg-head-bg lg:rounded-4xl lg:mx-24 relative'>
        <StartBtnDesktop />
        <HeadLinks />
        <Logo menuOpen={menuOpen} />
        <MenuButton menuOpen={menuOpen} handleMenuOpen={handleMenuOpen} />
      </div>
    </div>
  )
}

export default Header
