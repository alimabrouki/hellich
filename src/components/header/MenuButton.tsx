import type { animate, handleMenuProps, menuProps } from '../../types/menuProps'

function MenuButton ({
  handleMenuOpen,
  menuOpen,
  animate
}: menuProps & handleMenuProps & animate) {
  return (
    <button
      type='button'
      onClick={() => handleMenuOpen(!menuOpen)}
      className={`menu-button group relative lg:hidden py-2 px-3.5 bg-[#eaf9fb] mr-3 rounded-[3px]
          transform-gpu will-change-transform
          transition-[transform,opacity,filter] duration-[820ms]
          [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]
          ${
            animate
              ? 'translate-y-0 opacity-100 blur-0'
              : 'translate-y-16 opacity-0 blur-[6px]'
          }
          ${menuOpen ? 'bg-black text-[#eaf9fb]' : 'text-main-bleu'}`}
      style={{ transitionDelay: animate ? '110ms' : '0ms' }}
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
  )
}

export default MenuButton
