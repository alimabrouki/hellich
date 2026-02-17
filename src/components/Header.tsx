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
            <button onClick={() => handleMenuOpen(!menuOpen)} className={`menu-button relative sm:hidden py-2 px-3.5 bg-[#eaf9fb] mr-3 rounded-[3px]  ${menuOpen ? 'bg-black text-[#eaf9fb]' : 'text-main-bleu'}`}>
              <span className="menu-dot rounded-[40%] size-2 absolute translate-x-10 -translate-y-1 bg-main-bleu"></span>
              <span className="menu inline-block -translate-x-2 translate-y-1.25 font-[650]">Menu</span>
              </button>
          </div>
        </div>
  
  )
}

export default Header;