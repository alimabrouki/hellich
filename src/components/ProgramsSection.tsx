import { useEffect, useRef, type CSSProperties } from 'react'

const nutritionPrograms = [
  {
    title: 'وقود زيادة نظيفة',
    description: 'هيكلة عالية البروتين مع كربوهيدرات ذكية وتحضير أسبوعي.',
    tags: ['٤ أسابيع', 'حسب الماكروز', 'تحضير وجبات']
  },
  {
    title: 'إعادة ضبط خسارة الدهون',
    description: 'تدوير السعرات، التحكم في الشهية، وتعافٍ سريع.',
    tags: ['مرحلة تنشيف', 'بروتين عالٍ', 'ضغط منخفض']
  },
  {
    title: 'وقود الأداء',
    description: 'وجبات بتوقيت دقيق لأيام التدريب والراحة.',
    tags: ['رياضي', 'توقيت', 'ترطيب']
  },
  {
    title: 'قوة نباتية',
    description: 'بروتينات كاملة مع بدائل سهلة ووصفات بسيطة.',
    tags: ['نباتي', 'مناسب للمعدة', 'بسيط']
  }
]

const splitPrograms = [
  {
    title: '٤ أيام علوي / سفلي',
    description: 'توازن بين القوة والضخامة مع تعافٍ مدمج.',
    tags: ['متوسط', '٤ أيام', 'قوة']
  },
  {
    title: 'دفع / سحب / أرجل',
    description: 'تقسيمة كلاسيكية لزيادة الحجم والكثافة.',
    tags: ['ضخامة', '٥-٦ أيام', 'حجم']
  },
  {
    title: '٣ أيام جسم كامل',
    description: 'تمارين جسم كامل بكفاءة لأسابيع الانشغال.',
    tags: ['مبتدئ', '٣ أيام', 'موفّر للوقت']
  },
  {
    title: 'تقسيمة القوة الرياضية',
    description: 'قوة وسرعة ولياقة في نظام واحد.',
    tags: ['أداء', '٥ أيام', 'انفجارية']
  }
]

function ProgramsSection () {
  const programsRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let rafId: number | null = null

    const update = () => {
      rafId = null
      const programs = programsRef.current
      if (!programs) return

      const vh = window.innerHeight || 1
      const programsRect = programs.getBoundingClientRect()
      const programsStart = vh * 1.1
      const programsEnd = vh * 0.1
      const programsRaw =
        (programsStart - programsRect.top) / (programsStart - programsEnd)
      const programsProgress = Math.min(Math.max(programsRaw, 0), 1)
      const eased = 1 - Math.pow(1 - programsProgress, 3)
      const isMobile = window.innerWidth < 720
      const separationStart = isMobile ? 16 : 22
      const separationEnd = isMobile ? -24 : -40
      const shiftStart = isMobile ? 10 : 20
      const shiftEnd = 0
      const separation = separationStart + (separationEnd - separationStart) * eased
      const shift = shiftStart + (shiftEnd - shiftStart) * eased
      programs.style.setProperty(
        '--programs-stack-separation',
        `${separation.toFixed(1)}px`
      )
      programs.style.setProperty(
        '--programs-stack-shift',
        `${shift.toFixed(1)}px`
      )
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={programsRef}
      className='programs-section about'
      aria-labelledby='programs-title'
      dir='rtl'
    >
      <div className='programs-inner'>
        <h1 id='programs-title' className='programs-title'>
          برامج مجانية !
        </h1>
        <div className='programs-columns'>
          <div className='programs-column programs-column--left'>
            <h2 className='programs-column-title'>تقسيمات التمرين</h2>
            <div
              className='programs-stack'
              style={
                {
                  '--stack-pad': `${(splitPrograms.length - 1) * 28}px`
                } as CSSProperties
              }
            >
              {splitPrograms.map((program, index) => (
                <article
                  className='program-card program-card--stack'
                  key={`split-${program.title}`}
                  style={
                    {
                      '--stack-index': index * -1,
                      '--stack-z': splitPrograms.length - index
                    } as CSSProperties
                  }
                >
                  <div className='program-card__header'>
                    <span className='program-card__index'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className='program-card__title'>{program.title}</h3>
                  </div>
                  <div className='program-card__details'>
                    <p className='program-card__desc'>{program.description}</p>
                    <div className='program-card__tags'>
                      {program.tags.map(tag => (
                        <span
                          className='program-tag'
                          key={`${program.title}-${tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className='programs-column programs-column--right'>
            <h2 className='programs-column-title'>دليل التغذية</h2>
            <div
              className='programs-stack'
              style={
                {
                  '--stack-pad': `${(nutritionPrograms.length - 1) * 28}px`
                } as CSSProperties
              }
            >
              {nutritionPrograms.map((program, index) => (
                <article
                  className='program-card program-card--stack'
                  key={`nutrition-${program.title}`}
                  style={
                    {
                      '--stack-index': index,
                      '--stack-z': nutritionPrograms.length - index
                    } as CSSProperties
                  }
                >
                  <div className='program-card__header'>
                    <span className='program-card__index'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className='program-card__title'>{program.title}</h3>
                  </div>
                  <div className='program-card__details'>
                    <p className='program-card__desc'>{program.description}</p>
                    <div className='program-card__tags'>
                      {program.tags.map(tag => (
                        <span
                          className='program-tag'
                          key={`${program.title}-${tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgramsSection
