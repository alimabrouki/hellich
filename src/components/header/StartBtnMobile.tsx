import { Link } from 'react-router'
import type { menuProps } from '../../utils/menuProps'

function StartBtnMobile ({ menuOpen }: menuProps) {
  return (
    <Link
      className={`text-head-btn bg-black self-center rounded-2xl px-9 py-2 flex items-center font-bold
                  transition-all duration-500 ease-out delay-400
                  ${
                    menuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
      to={'/'}
    >
      إبدأ الآن
    </Link>
  )
}

export default StartBtnMobile
