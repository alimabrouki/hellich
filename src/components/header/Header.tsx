import type { handleMenuProps, menuProps } from '../../types/menuProps'
import HeadLinks from './HeadLinks'
import Logo from './Logo'
import MenuButton from './MenuButton'
import StartBtnDesktop from './StartBtnDesktop'

function Header ({ menuOpen, handleMenuOpen }: menuProps & handleMenuProps) {
  return (
    <div className='header sticky top-0 z-50'>
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
