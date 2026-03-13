import { useEffect, useRef, useState } from 'react'
import type { animate, handleMenuProps, menuProps } from '../../types/types'
import HeadLinks from './HeadLinks'
import Logo from './Logo'
import MenuButton from './MenuButton'
import StartBtnDesktop from './StartBtnDesktop'

function Header ({
  menuOpen,
  handleMenuOpen,
  animate
}: menuProps & handleMenuProps & animate) {
  const [isVisible, setIsVisible] = useState(true)
  const [introActive, setIntroActive] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const lastScrollY = useRef(0)
  const isTicking = useRef(false)
  const downDistance = useRef(0)
  const upDistance = useRef(0)

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIntroActive(false)
    })
    return () => window.cancelAnimationFrame(frameId)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      setIsVisible(true)
    }
  }, [menuOpen])

  useEffect(() => {
    const initialScrollY = window.scrollY
    lastScrollY.current = initialScrollY
    setIsAtTop(initialScrollY <= 24)

    const onScroll = () => {
      const currentScrollY = window.scrollY

      if (isTicking.current) {
        return
      }

      isTicking.current = true
      window.requestAnimationFrame(() => {
        const delta = currentScrollY - lastScrollY.current
        const atTop = currentScrollY <= 24

        setIsAtTop((prev) => (prev === atTop ? prev : atTop))

        if (menuOpen) {
          setIsVisible(true)
          downDistance.current = 0
          upDistance.current = 0
        } else if (atTop) {
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

  const showHeadLinks = isAtTop && !menuOpen
  const showDesktopMenuButton = !isAtTop || menuOpen

  return (
    <div
      className={`header fixed h-[86px] 
         py-4 left-0 right-0 z-50 sm:px-4 md:px-8 lg:px-12 perspective-[1200px]
      transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
      ${isVisible ? 'translate-y-0' : '-translate-y-[140%]'}
      ${introActive ? 'overflow-hidden' : 'overflow-visible'}`}
    >
      <div
        className={`head flex justify-between lg:mx-24 relative origin-bottom transform-gpu will-change-transform
        transition-[transform] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          introActive
            ? 'translate-y-[55%] rotate-x-[75deg]'
            : 'translate-y-0 rotate-x-[0deg]'
        }`}
      >
        <StartBtnDesktop />
        <div className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:grid place-items-center'>
          <div
            className={`col-start-1 row-start-1 transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${showHeadLinks ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <HeadLinks />
          </div>
          <div
            className={`col-start-1 row-start-1 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              showDesktopMenuButton
                ? 'opacity-100 translate-y-0'
                : 'pointer-events-none opacity-0 translate-y-2'
            }`}
          >
            <MenuButton
              animate={animate}
              menuOpen={menuOpen}
              showOnDesktop
              handleMenuOpen={handleMenuOpen}
            />
          </div>
        </div>
        <Logo animate={animate} menuOpen={menuOpen} />
        <MenuButton
          animate={animate}
          menuOpen={menuOpen}
          handleMenuOpen={handleMenuOpen}
        />
      </div>
    </div>
  )
}

export default Header
