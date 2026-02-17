
import logo from '../assets/images/logo.svg'
import NavLink from "./NavLink"
function Header() {

  return (

      <div className="header relative">
          <div className="head sm:bg-head-bg sm:rounded-4xl sm:mx-24 flex items-center justify-end ">
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
            <img  className="w-[140px] mr-auto sm:mr-5" src={logo} alt="" />
            <button className="menu-button ">
              <span className="menu-dot rounded-[40%] size-2 absolute translate-x-10 -translate-y-1 bg-main-bleu"></span>
              <span className="menu inline-block -translate-x-2 translate-y-1.25 font-[650]">Menu</span>
              </button>
          </div>
        </div>
  
  )
}

export default Header;