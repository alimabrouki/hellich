import type { animate, menuProps } from '../../types/menuProps'
import logo from '../../assets/images/logo.svg'

function Logo ({ menuOpen, animate }: menuProps & animate) {
  return (
    <img
      className={`transform transition-all duration-900 ease-out
    ${
      animate ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    } w-35 rounded-[3px] mr-auto lg:mr-5 ${menuOpen && 'bg-black'}`}
      src={logo}
      alt=''
    />
  )
}

export default Logo
