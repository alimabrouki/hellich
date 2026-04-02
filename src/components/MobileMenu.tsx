import LibyaTime from '../utils/LibyaTime'
import NavLink from './header/NavLink'
import type { handleMenuProps, menuProps } from '../types/types'
import StartBtnMobile from './header/StartBtnMobile'

function MobileMenu ({ menuOpen, handleMenuOpen }: menuProps & handleMenuProps) {
  const revealDelay = (offset = 0) => (menuOpen ? `${offset}ms` : '0ms')
  const closeMenu = () => handleMenuOpen(false)

  return (
    <div
      className={`menu-wrap fixed right-0 bottom-0 z-40 flex w-full items-end overflow-hidden bg-[url('../assets/images/light-grain-bg.svg')] bg-cover bg-center bg-no-repeat opacity-100
            transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${menuOpen ? '' : 'pointer-events-none'}`}
      style={{ height: menuOpen ? '100%' : '0%' }}
    >
      <div className='relative z-10 flex w-full flex-col items-end justify-center gap-4 p-4 text-[30px] font-bold'>
        <span
          className={`transition-all duration-350 ease-out text-[25px] text-text-dark font-medium time-font ${
            menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: revealDelay(0) }}
        >
          .انضباط. قوة. نتائج حقيقية
        </span>
        <div
          className={`w-full overflow-hidden transition-all duration-350 ease-out
                ${menuOpen ? 'max-h-15' : 'max-h-0'}`}
          style={{ transitionDelay: revealDelay(12) }}
        >
          <div
            className={`w-full h-px bg-black origin-right transition-all duration-450
                  ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
            style={{ transitionDelay: revealDelay(20) }}
          ></div>
        </div>

        <div
          className={`transition-all duration-350 ease-out flexx gap-2.5
                ${
                  menuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
          style={{ transitionDelay: revealDelay(30) }}
        >
          <NavLink menuOpen={menuOpen} href='#programs' onClick={closeMenu}>
            برامج مجانية
          </NavLink>
          <span className='text-[15px] font-zero font-jetbrains font-thin'>
            01
          </span>
        </div>

        <div
          className={`w-full overflow-hidden transition-all duration-350 ease-out
              ${menuOpen ? 'max-h-15' : 'max-h-0'}`}
          style={{ transitionDelay: revealDelay(45) }}
        >
          <div
            className={`w-full h-px bg-black origin-right transition-all duration-450
                ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
            style={{ transitionDelay: revealDelay(55) }}
          ></div>
        </div>

        <div
          className={`transition-all duration-350 ease-out flexx gap-2.5
              ${
                menuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
          style={{ transitionDelay: revealDelay(70) }}
        >
          <NavLink menuOpen={menuOpen} href='#contact' onClick={closeMenu}>
            تواصل معي
          </NavLink>
          <span className='text-[15px] font-zero font-jetbrains font-light'>
            02
          </span>
        </div>

        <div
          className={`w-full overflow-hidden transition-all duration-350 ease-out
                ${menuOpen ? 'max-h-15' : 'max-h-0'}`}
          style={{ transitionDelay: revealDelay(85) }}
        >
          <div
            className={`w-full h-px bg-black origin-right transition-all duration-450
                  ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
            style={{ transitionDelay: revealDelay(95) }}
          ></div>
        </div>

        <div
          className={`transition-all duration-350 ease-out flexx gap-2.5
                ${
                  menuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
          style={{ transitionDelay: revealDelay(110) }}
        >
          <NavLink menuOpen={menuOpen} href='#who-am-i' onClick={closeMenu}>
            من أنا ؟
          </NavLink>
          <span className='text-[15px] font-zero font-jetbrains font-light'>
            03
          </span>
        </div>

        <div
          className={`w-full overflow-hidden transition-all duration-350 ease-out
              ${menuOpen ? 'max-h-15' : 'max-h-0'}`}
          style={{ transitionDelay: revealDelay(125) }}
        >
          <div
            className={`w-full h-px bg-black origin-right transition-all duration-450
                ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
            style={{ transitionDelay: revealDelay(135) }}
          ></div>
        </div>

        <div
          className={`transition-all duration-350 ease-out flexx gap-2.5
              ${
                menuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
          style={{ transitionDelay: revealDelay(150) }}
        >
          <NavLink menuOpen={menuOpen} href='/faq' onClick={closeMenu}>
            الأسئلة الشائعة
          </NavLink>
          <span className='text-[15px] font-zero font-jetbrains font-light'>
            04
          </span>
        </div>

        <div
          className={`w-full overflow-hidden transition-all duration-350 ease-out
                ${menuOpen ? 'max-h-15' : 'max-h-0'}`}
          style={{ transitionDelay: revealDelay(165) }}
        >
          <div
            className={`w-full h-px bg-black origin-right transition-all duration-450
                  ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
            style={{ transitionDelay: revealDelay(175) }}
          ></div>
        </div>
        <StartBtnMobile
          menuOpen={menuOpen}
          delayMs={menuOpen ? 185 : 0}
          onClick={closeMenu}
        />
        <div
          className={`copyright-and-time flex items-center justify-between w-full
                  transition-all duration-350 ease-out
                  ${
                    menuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
          style={{ transitionDelay: revealDelay(195) }}
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
