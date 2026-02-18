import logo from '../assets/images/logo.svg'
import NavLink from "./NavLink"

type HeaderProps = {
  handleMenuOpen: (state: boolean) => void;
  menuOpen: boolean;
}

function Header({handleMenuOpen,menuOpen}: HeaderProps) {
  
  return (

      <div className="header z-20 relative">
          <div className="head sm:bg-head-bg sm:rounded-4xl sm:mx-24 flex  justify-end ">
            <div className="head-links max-sm:hidden">
              <NavLink href={"/"}>
                برامج
              </NavLink>
              <NavLink href={ "/contact"}>
                تواصل معي
              </NavLink>
              <NavLink href={ "/about"}>
                من أنا ؟
              </NavLink>
              <NavLink href={"/faq" }>
                الأسئلة الشائعة
              </NavLink>
            </div>
            <img  className={`w-[140px] rounded-[3px] mr-auto sm:mr-5 ${menuOpen && 'bg-black'}`} src={logo} alt="" />
            <button
              type="button"
              onClick={() => handleMenuOpen(!menuOpen)}
              className={`menu-button group relative sm:hidden py-2 px-3.5 bg-[#eaf9fb] mr-3 rounded-[3px]  ${menuOpen ? 'bg-black text-[#eaf9fb]' : 'text-main-bleu '}`}
            >

              <span className="menu-dot rounded-[40%] size-2 absolute translate-x-10 -translate-y-1 bg-main-bleu ">
              </span>

              <span className={`menu-dot rounded-[40%] size-2 absolute translate-x-10 ${menuOpen ? 'translate-y-2' : '-translate-y-1'} bg-main-bleu transition-transform duration-300`}>
              </span>

                <span className={`menu-dot rounded-[40%] size-2 absolute translate-x-10 ${menuOpen ? 'translate-y-5' : '-translate-y-1'} bg-main-bleu transition-transform duration-300`}>
              </span>

              <span className="relative inline-block -translate-x-2 translate-y-1.25 overflow-hidden align-bottom font-[650] leading-none">
                <span
                  className={`block transition-all duration-250 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? '-translate-y-full blur-[10px] opacity-0' : ''}`}
                >
                  Menu
                </span>
                <span
                  className={`absolute left-0 top-full block transition-transform duration-250 ease-[cubic-bezier(0.76,0,0.24,1)] ${menuOpen ? '-translate-y-full' : ''}`}
                >
                  Close
                </span>
              </span>
              </button>
          </div>
        </div>
  
  )
}

export default Header;