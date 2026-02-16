import profileImage from "./assets/images/hellich-hero-image.png"
import logo from "./assets/images/logo.svg"
import { Link } from "react-router"
import './App.css'
import './index.css'
import StaticGrainBackground from "./utils/StaticGrainBackground"
import Header from "./components/Header"
import NavLink from "./components/NavLink"

function App() {
  return (
    <div className="wrapper">
      <div className="hellich relative pt-8 overflow-visible bg-black rounded-2xl">

        <StaticGrainBackground className="absolute inset-0 rounded-2xl" />

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
            <div className="menu-button sm:hidden p-7 bg-amber-600 ">Menu</div>
          </div>
        </div>

        <div className="hero relative z-10 min-h-screen flex items-center justify-center">

          { <img
            src={profileImage}
            alt="Trainer"
            className="absolute -top-40 right-40  -translate-x-1/1 w-[570px]"
          /> }

          <p className="text-center text-5xl lg:text-7xl text-main-bleu font-cairo">
            Elite Personal Training
          </p>

        </div>
      </div>
    </div>
  )
}


export default App
