import logo from '../../assets/images/logo.svg'
import NavLink from '../NavLink'
import StartBtnDesktop from './StartBtnDesktop'

type HeaderProps = {
  handleMenuOpen: (state: boolean) => void
  menuOpen: boolean
}

function Header ({ handleMenuOpen, menuOpen }: HeaderProps) {
  const links = [
    { href: '/faq', label: 'الأسئلة الشائعة', num: '04' },
    { href: '/contact', label: 'تواصل معي', num: '02' },
    { href: '/about', label: 'من أنا ؟', num: '03' },
    { href: '/program', label: 'برامج', num: '01' }
  ]
  return (
    /* ===== Sticky Header ===== */
    <div className='header sticky top-0 z-50'>
      <div className='head flex justify-end lg:bg-head-bg lg:rounded-4xl lg:mx-24 relative'>
        <StartBtnDesktop />
        <div className='hidden lg:flex head-links'>
          {links.map(link => (
            <NavLink key={link.href} menuOpen={false} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <img
          className={`w-[140px] rounded-[3px] mr-auto lg:mr-5 ${
            menuOpen && 'bg-black'
          }`}
          src={logo}
          alt=''
        />

        <button
          type='button'
          onClick={() => handleMenuOpen(!menuOpen)}
          className={`menu-button group relative lg:hidden py-2 px-3.5 bg-[#eaf9fb] mr-3 rounded-[3px]
          ${menuOpen ? 'bg-black text-[#eaf9fb]' : 'text-main-bleu'}`}
        >
          <span className='menu-dot rounded-[40%] size-2 absolute translate-x-10 -translate-y-1 bg-main-bleu'></span>

          <span
            className={`menu-dot rounded-[40%] size-2 absolute translate-x-10
            ${menuOpen ? 'translate-y-2' : '-translate-y-1'}
            bg-main-bleu transition-transform duration-300`}
          ></span>

          <span
            className={`menu-dot rounded-[40%] size-2 absolute translate-x-10
            ${menuOpen ? 'translate-y-5' : '-translate-y-1'}
            bg-main-bleu transition-transform duration-300`}
          ></span>

          <span className='relative inline-block -translate-x-2 translate-y-1.25 overflow-hidden align-bottom font-[650] leading-none'>
            <span
              className={`block transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]
              ${menuOpen ? '-translate-y-full blur-[10px] opacity-0' : ''}`}
            >
              Menu
            </span>
            <span
              className={`absolute left-0 top-full block transition-transform duration-350 ease-[cubic-bezier(0.76,0,0.24,1)]
              ${menuOpen ? '-translate-y-full' : ''}`}
            >
              Close
            </span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default Header
