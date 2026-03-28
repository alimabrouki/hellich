import { useEffect, useRef, type CSSProperties } from 'react'
import nutrition01 from '../assets/images/nutrition01.jpg'
import nutrition02 from '../assets/images/nutrition02.jpg'
import nutrition03 from '../assets/images/nutrition03.jpg'
import nutrition04 from '../assets/images/nutrition04.jpg'
import workout01 from '../assets/images/workout01.jpg'
import workout02 from '../assets/images/workout02.jpg'
import workout03 from '../assets/images/workout03.png'
import workout04 from '../assets/images/workout04.png'

const nutritionPrograms = [
  {
    title: 'وقود زيادة نظيفة',
    description: 'هيكلة عالية البروتين مع كربوهيدرات ذكية وتحضير أسبوعي.',
    fullDescription:
      'دليل كامل لزيادة نظيفة يشمل جدول وجبات يومي، توزيع الماكروز، قائمة مشتريات، وخيارات بديلة سريعة لكل وجبة بدون تعقيد.',
    tags: ['٤ أسابيع', 'حسب الماكروز', 'تحضير وجبات'],
    image: nutrition01
  },
  {
    title: 'إعادة ضبط خسارة الدهون',
    description: 'تدوير السعرات، التحكم في الشهية، وتعافٍ سريع.',
    fullDescription:
      'خطة تنشيف تدريجية مع إعادة تغذية محسوبة وتتبع وزن أسبوعي، ونظام وجبات منخفض الجهد يحافظ على الشبع ويثبت الأداء.',
    tags: ['مرحلة تنشيف', 'بروتين عالٍ', 'ضغط منخفض'],
    image: nutrition02
  },
  {
    title: 'وقود الأداء',
    description: 'وجبات بتوقيت دقيق لأيام التدريب والراحة.',
    fullDescription:
      'برنامج توقيت كارب وبروتين حول التمرين، توزيع وجبات لأيام الراحة، وإرشادات ترطيب ومكملات أساسية لرفع الأداء.',
    tags: ['رياضي', 'توقيت', 'ترطيب'],
    image: nutrition03
  },
  {
    title: 'قوة نباتية',
    description: 'بروتينات كاملة مع بدائل سهلة ووصفات بسيطة.',
    fullDescription:
      'دليل نباتي عملي لبناء العضلات يتضمن مصادر بروتين كاملة، دمج أحماض أمينية، ووصفات خفيفة على المعدة.',
    tags: ['نباتي', 'مناسب للمعدة', 'بسيط'],
    image: nutrition04
  }
]

const splitPrograms = [
  {
    title: '٤ أيام علوي / سفلي',
    description: 'توازن بين القوة والضخامة مع تعافٍ مدمج.',
    fullDescription:
      'جدول أسبوعي مفصل بالحجم والشدة، تقسيم عضلات واضح، وتمارين بديلة مع أسبوع تخفيف دوري للحفاظ على التعافي.',
    tags: ['متوسط', '٤ أيام', 'قوة'],
    image: workout01
  },
  {
    title: 'دفع / سحب / أرجل',
    description: 'تقسيمة كلاسيكية لزيادة الحجم والكثافة.',
    fullDescription:
      'خطة تضخيم كلاسيكية مع تقدم بالأوزان، توزيع أحمال متوازن، وتمارين دعم لتقوية نقاط الضعف على المدى الطويل.',
    tags: ['ضخامة', '٥-٦ أيام', 'حجم'],
    image: workout02
  },
  {
    title: '٣ أيام جسم كامل',
    description: 'تمارين جسم كامل بكفاءة لأسابيع الانشغال.',
    fullDescription:
      'برنامج مختصر يحافظ على القوة في أسابيع الانشغال، يعتمد على تمارين مركبة وإحماء سريع وخطة تقدّم بسيطة.',
    tags: ['مبتدئ', '٣ أيام', 'موفّر للوقت'],
    image: workout03
  },
  {
    title: 'تقسيمة القوة الرياضية',
    description: 'قوة وسرعة ولياقة في نظام واحد.',
    fullDescription:
      'نظام أداء يجمع السرعة والقوة الانفجارية مع لياقة وظيفية، ويحدد بوضوح أيام الشدة العالية والمتوسطة.',
    tags: ['أداء', '٥ أيام', 'انفجارية'],
    image: workout04
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
                      '--stack-z': splitPrograms.length - index,
                      '--card-bg': `url(${program.image})`
                    } as CSSProperties
                  }
                >
                  <div className='program-card__content'>
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
                    <p className='program-card__full'>{program.fullDescription}</p>
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
                      '--stack-z': nutritionPrograms.length - index,
                      '--card-bg': `url(${program.image})`
                    } as CSSProperties
                  }
                >
                  <div className='program-card__content'>
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
                    <p className='program-card__full'>{program.fullDescription}</p>
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
