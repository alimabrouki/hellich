import { useEffect, useState } from 'react'

function HeroTitle () {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])
  return (
    <h1
      dir='rtl'
      className={`hero-img text-[clamp(4.4rem,19vw,7.9rem)] max-[479px]:text-[60px] sm:text-[clamp(4.8rem,12.2vw,11.8rem)] text-second-bg font-extrabold text-right tracking-tight pr-4 transform transition-all duration-900 ease-out
    ${animate ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} `}
    >
      <span> إبني معي جسمًا أكثر </span>{' '}
      <span className='word-slot transform translate-x-2.5  relative inline-flex h-[93px] w-[7.6ch] sm:w-[7.1ch] overflow-hidden align-baseline'>
        <span className='word-slider absolute inset-0'>
          <span>ضخامة</span>
          <span>قوة</span>
          <span>تناسقًا</span>
          <span>صلابة</span>
          <span>حضورًا</span>
          <span>ضخامة</span>
        </span>
      </span>{' '}
      <span className='block leading-[27px]'>الآن</span>
    </h1>
  )
}

export default HeroTitle
