import type { menuProps } from '../../types/types'

type StartBtnMobileProps = menuProps & {
  delayMs?: number
}

function StartBtnMobile ({ menuOpen, delayMs = 0 }: StartBtnMobileProps) {
  return (
    <a
      className={`text-head-btn bg-black self-center rounded-2xl px-9 py-2 flex items-center font-bold
                  transition-all duration-500 ease-out
                  ${
                    menuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
      href='#contact'
      style={{ transitionDelay: menuOpen ? `${delayMs}ms` : '0ms' }}
    >
      إبدأ الآن
    </a>
  )
}

export default StartBtnMobile
