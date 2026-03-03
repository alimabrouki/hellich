function HeroTitle () {
  return (
    <h1
      dir='rtl'
      className='text-[clamp(4.4rem,19vw,7.9rem)] sm:text-[clamp(4.8rem,12.2vw,11.8rem)] text-second-bg font-extrabold text-right leading-[0.9] tracking-tight'
    >
      إصنع جسمًا أكثر{' '}
      <span className='word-slot relative inline-flex h-[93px] w-[7.6ch] sm:w-[7.1ch] mx-[0.2em] overflow-hidden align-baseline'>
        <span className='word-slider absolute inset-0'>
          <span>ضخامة</span>
          <span>قوة</span>
          <span>تناسقًا</span>
          <span>صلابة</span>
          <span>حضورًا</span>
          <span>ضخامة</span>
        </span>
      </span>{' '}
      اليوم
    </h1>
  )
}

export default HeroTitle
