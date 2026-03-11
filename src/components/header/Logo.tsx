import type { animate, menuProps } from '../../types/types'
import logo from '../../assets/images/logo.svg'

function Logo ({ menuOpen, animate }: menuProps & animate) {
  return (
    <img
      className={`w-35 rounded-[3px] mr-auto lg:mr-5  ${
        menuOpen ? 'bg-black' : ''
      }`}
      style={{ transitionDelay: animate ? '40ms' : '0ms' }}
      src={logo}
      alt=''
    />
  )
}

export default Logo
