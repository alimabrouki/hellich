
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
              <span className="menu-dot "></span>
              <span className="menu ">Menu</span>
              </button>
          </div>
        </div>
  
  )
}

export default Header;