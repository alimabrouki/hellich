import profileImage from '../assets/images/hellich-hero-image.png'
import StaticGrainBackground from '../utils/StaticGrainBackground'
import '../App.css'
import Header from './header/Header'
import { useEffect, useState } from 'react'
import NavLink from './header/NavLink'
import LibyaTime from '../utils/LibyaTime'

function Hellich () {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style = 'overflow:hidden'
    } else {
      document.body.style = ''
    }
  }, [menuOpen])

  const handleMenuOpen = (state: boolean) => {
    setMenuOpen(state)
  }
  return (
    <>
      <div className='wrapper'>
        <div className='hellich relative pt-8 rounded-2xl'>
          <StaticGrainBackground className='absolute inset-0 rounded-2xl -z-50' />

          <Header menuOpen={menuOpen} handleMenuOpen={handleMenuOpen} />

          <div
            className={`menu-wrap absolute inset-0 z-40 rounded-2xl
  transition-opacity duration-300 
  ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <StaticGrainBackground
              className='absolute inset-0 rounded-2xl'
              colors={[
                '#e7e7e5',
                '#e6e6e4',
                '#e5e5e3',
                '#e8e8e6',
                '#e4e4e2',
                '#e9e9e7'
              ]}
            />

            <div className='relative z-10 mt-35 flex flex-col items-end justify-center gap-4 text-[30px] font-bold'>
              <span
                className={`transition-all duration-500 ease-out delay-200 text-[25px] text-text-dark  font-medium time-font mr-2.5 ${
                  menuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: menuOpen ? '100ms' : '0ms' }}
              >
                .انضباط. قوة. نتائج حقيقية
              </span>
              <div
                className={`w-full px-3.5 overflow-hidden transition-all duration-500 ease-out
      ${menuOpen ? 'max-h-[60px]' : 'max-h-0'}`}
              >
                <div
                  className={`w-full h-[0.5px] bg-black origin-right transition-all duration-700 delay-100
        ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
                ></div>
              </div>

              <div
                className={`transition-all duration-500 ease-out mr-2.5 flexx gap-2.5
      ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
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
                className={`w-full px-3.5 overflow-hidden transition-all duration-500 ease-out delay-100
      ${menuOpen ? 'max-h-[60px]' : 'max-h-0'}`}
              >
                <div
                  className={`w-full h-[0.5px] bg-black origin-right transition-all duration-700 delay-200
        ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
                ></div>
              </div>

              <div
                className={`transition-all duration-500 ease-out delay-150 mr-2.5 flexx  gap-2.5
      ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
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
                className={`w-full px-3.5 overflow-hidden transition-all duration-500 ease-out delay-200
      ${menuOpen ? 'max-h-[60px]' : 'max-h-0'}`}
              >
                <div
                  className={`w-full h-[0.5px] bg-black origin-right transition-all duration-700 delay-300
        ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
                ></div>
              </div>

              <div
                className={`transition-all duration-500 ease-out delay-200 mr-2.5 flexx  gap-2.5
      ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
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
                className={`w-full px-3.5 overflow-hidden transition-all duration-500 ease-out delay-300
      ${menuOpen ? 'max-h-[60px]' : 'max-h-0'}`}
              >
                <div
                  className={`w-full h-[0.5px] bg-black origin-right transition-all duration-700 delay-400
        ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
                ></div>
              </div>

              <div
                className={`transition-all duration-500 ease-out delay-300 mr-2.5 flexx gap-2.5
      ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
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
                className={`w-full px-3.5 overflow-hidden transition-all duration-500 ease-out delay-[400ms]
      ${menuOpen ? 'max-h-[60px]' : 'max-h-0'}`}
              >
                <div
                  className={`w-full h-[0.5px] bg-black origin-right transition-all duration-700 delay-500
        ${menuOpen ? 'scale-x-100' : 'scale-x-0'}`}
                ></div>
              </div>
              <div
                className={`copyright-and-time flexx gap-13 mt-20 
  transition-all duration-500 ease-out delay-[400ms]
  ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: menuOpen ? '550ms' : '0ms' }}
              >
                <span
                  className={`text-[18px] font-zero font-jetbrains font-light time-font`}
                >
                  Hellich &copy;2026
                </span>

                <LibyaTime menuOpen={menuOpen} />
              </div>
            </div>
          </div>

          <div
            className={`hero relative z-10 min-h-screen flex items-center justify-center
      transition-opacity duration-300
      ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <img
              src={profileImage}
              alt='Trainer'
              className='absolute -top-40 right-40 -translate-x-1/1 w-[570px]'
            />

            <p className='text-center text-5xl lg:text-7xl text-main-bleu font-cairo'>
              Elite Personal Training
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hellich
