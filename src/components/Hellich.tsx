import profileImage from "../assets/images/hellich-hero-image.png"
import StaticGrainBackground from "../utils/StaticGrainBackground"
import Header from "./Header"
import { useEffect, useState } from 'react';

function Hellich() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="wrapper">
      <div
        className={`hellich relative pt-8 rounded-2xl overflow-hidden
  `}
      >
        <div className={`
          menu-layout 
          absolute 
          inset-0 
          transition-transform 
          duration-100
          rounded-2xl
          z-20
        ${menuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
          <StaticGrainBackground
            className="absolute inset-0 rounded-2xl"
            colors={['#d6dada',
              '#d6dada',
              '#d6dada',
              '#eaf9fb',
              '#d6dada',
              '#eaf9fb',
            ]} />
        </div>
        <StaticGrainBackground className="absolute inset-0 rounded-2xl" />

        <Header menuOpen={menuOpen} handleMenuOpen={handleMenuOpen} />

        <div className="hero relative z-10 min-h-screen flex items-center justify-center">

          {<img
            src={profileImage}
            alt="Trainer"
            className="absolute -top-40 right-40  -translate-x-1/1 w-[570px]"
          />}

          <p className="text-center text-5xl lg:text-7xl text-main-bleu font-cairo">
            Elite Personal Training
          </p>

        </div>
      </div>
    </div>
  )
}

export default Hellich;