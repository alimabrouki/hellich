import LibyaTime from '../utils/LibyaTime'
import NavLink from './header/NavLink'
import type { menuProps } from '../utils/menuProps'
import StartBtnMobile from './header/StartBtnMobile'

function MobileMenu ({ menuOpen }: menuProps) {
  return (
    <div
      className={`menu-wrap flex items-end p-4 bg-[url('./assets/images/light-grain-bg.svg')] bg-cover bg-center bg-no-repeat fixed top-0 right-0 h-full w-full  z-40 
            transition-opacity duration-300 
            ${
              menuOpen
                ? 'opacity-100 translate-y-0'
                : 'translate-y-full opacity-0 pointer-events-none'
            }`}
    >
      <div className='relative z-10 flex w-full flex-col items-end justify-center gap-4 text-[30px] font-bold'>
        <span
          className={`transition-all duration-500 ease-out delay-200 text-[25px] text-text-dark  font-medium time-font ${
            menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: menuOpen ? '100ms' : '0ms' }}
        >
          .انضباط. قوة. نتائج حقيقية
        </span>
        <div
          className={`w-full overflow-hidden transition-all duration-500 ease-out
                ${menuOpen ? 'max-h-15' : 'max-h-0'}`}
        >
          <div
            className={`w-full h-px bg-black origin-right transition-all duration-700 delay-100
                  ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
          ></div>
        </div>

        <div
          className={`transition-all duration-500 ease-out flexx gap-2.5
                ${
                  menuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
          style={{ transitionDelay: menuOpen ? '150ms' : '0ms' }}
        >
          <NavLink menuOpen={menuOpen} href='/'>
            برامج
          </NavLink>
          <span className='text-[15px] font-zero font-jetbrains font-thin'>
            01
          </span>
        </div>

        <div
          className={`w-full overflow-hidden transition-all duration-500 ease-out delay-100
              ${menuOpen ? 'max-h-15' : 'max-h-0'}`}
        >
          <div
            className={`w-full h-px bg-black origin-right transition-all duration-700 delay-200
                ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
          ></div>
        </div>

        <div
          className={`transition-all duration-500 ease-out delay-150 flexx  gap-2.5
              ${
                menuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
          style={{ transitionDelay: menuOpen ? '250ms' : '0ms' }}
        >
          <NavLink menuOpen={menuOpen} href='/contact'>
            تواصل معي
          </NavLink>
          <span className='text-[15px] font-zero font-jetbrains font-light'>
            02
          </span>
        </div>

        <div
          className={`w-full overflow-hidden transition-all duration-500 ease-out delay-200
                ${menuOpen ? 'max-h-15' : 'max-h-0'}`}
        >
          <div
            className={`w-full h-px bg-black origin-right transition-all duration-700 delay-300
                  ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
          ></div>
        </div>

        <div
          className={`transition-all duration-500 ease-out delay-200 flexx  gap-2.5
                ${
                  menuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
          style={{ transitionDelay: menuOpen ? '350ms' : '0ms' }}
        >
          <NavLink menuOpen={menuOpen} href='/about'>
            من أنا ؟
          </NavLink>
          <span className='text-[15px] font-zero font-jetbrains font-light'>
            03
          </span>
        </div>

        <div
          className={`w-full overflow-hidden transition-all duration-500 ease-out delay-300
              ${menuOpen ? 'max-h-15' : 'max-h-0'}`}
        >
          <div
            className={`w-full h-px bg-black origin-right transition-all duration-700 delay-400
                ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
          ></div>
        </div>

        <div
          className={`transition-all duration-500 ease-out delay-300 flexx gap-2.5
              ${
                menuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
          style={{ transitionDelay: menuOpen ? '450ms' : '0ms' }}
        >
          <NavLink menuOpen={menuOpen} href='/faq'>
            الأسئلة الشائعة
          </NavLink>
          <span className='text-[15px] font-zero font-jetbrains font-light'>
            04
          </span>
        </div>

        <div
          className={`w-full overflow-hidden transition-all duration-500 ease-out delay-400
                ${menuOpen ? 'max-h-15' : 'max-h-0'}`}
        >
          <div
            className={`w-full h-px bg-black origin-right transition-all duration-700 delay-500
                  ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
          ></div>
        </div>
        <StartBtnMobile menuOpen={menuOpen} />
        <div
          className={`copyright-and-time flex items-center justify-between w-full
                  transition-all duration-500 ease-out delay-300
                  ${
                    menuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
          style={{ transitionDelay: menuOpen ? '550ms' : '0ms' }}
        >
          <span
            className={`text-[18px] font-zero font-jetbrains font-light time-font`}
          >
            Hellich &copy;2026
          </span>

          <LibyaTime />
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
