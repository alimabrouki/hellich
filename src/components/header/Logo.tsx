import type {
  animate,
  logoClickProps,
  logoContrastProps,
  menuProps
} from '../../types/types'
import logo from '../../assets/images/logo.svg'

function Logo ({
  menuOpen,
  animate,
  logoOnLight,
  onLogoClick
}: menuProps & animate & logoContrastProps & logoClickProps) {
  return (
    <a href='#top' aria-label='العودة للأعلى' onClick={onLogoClick}>
      <img
        className={`w-35 rounded-[3px] mr-auto lg:mr-5 ${
          menuOpen || logoOnLight ? 'bg-black' : ''
        }`}
        style={{ transitionDelay: animate ? '40ms' : '0ms' }}
        src={logo}
        alt=''
      />
    </a>
  )
}

export default Logo
