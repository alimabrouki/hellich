interface NavLinkProps {
  href: string
  children: string
  menuOpen: boolean
}

function NavLink ({ href, children, menuOpen }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`group relative inline-block overflow-hidden  ${
        menuOpen ? 'text-black' : 'text-white'
      }`}
    >
      <span className='block transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:blur-[10px] group-hover:opacity-0'>
        {children}
      </span>
      <span className='absolute left-0 top-full block transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full'>
        {children}
      </span>
    </a>
  )
}

export default NavLink
