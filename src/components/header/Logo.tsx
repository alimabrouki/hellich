import type { animate, menuProps } from '../../types/types'
import logo from '../../assets/images/logo.svg'

function Logo ({ menuOpen, animate }: menuProps & animate) {
  return (
    <img
      className={`w-35 rounded-[3px] mr-auto lg:mr-5 transform-gpu will-change-transform
      transition-[transform,opacity,filter] duration-[760ms]
      [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
      ${
        animate
          ? 'translate-y-0 opacity-100 blur-0'
          : 'translate-y-14 opacity-0 blur-[6px]'
      } ${menuOpen ? 'bg-black' : ''}`}
      style={{ transitionDelay: animate ? '40ms' : '0ms' }}
      src={logo}
      alt=''
    />
  )
}

export default Logo
