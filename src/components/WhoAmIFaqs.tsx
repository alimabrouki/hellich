import { memo, useCallback, useEffect, useRef, useState } from 'react'
import WhoAmIFaqItem from './WhoAmIFaqItem'

const faqTitle = 'عندك أسألة ؟'
const faqTitleWords = faqTitle.split(/\s+/)
const wordDelayMs = 45
const faqRevealStepMs = 90

const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
const toArabicNumber = (value: number) =>
  String(value)
    .split('')
    .map(char =>
      char >= '0' && char <= '9' ? arabicDigits[Number(char)] : char
    )
    .join('')

const faqs = [
  {
    question: 'هل يجب أن أكون في فورما قبل أن أبدأ؟',
    answer:
      ' لا، بالعكس. التدريب مصمم لكل المستويات، سواء كنت مبتدئ تماماً أو لديك خبرة سابقة.\nهدفي هو أن آخذك من مستواك الحالي إلى أفضل نسخة منك، خطوة بخطوة وبطريقة آمنة وفعالة.'
  },
  {
    question: 'هل التدريب مناسب للمبتدئين؟',
    answer:
      ' نعم، ومصمم خصيصاً لهم أيضاً.\nأغلب الأشخاص الذين أعمل معهم يبدأون من الصفر، ويتم توجيههم بشكل تدريجي لبناء الأساس الصحيح في التمرين، التقنية، والانضباط.\nالبداية الصحيحة هي أهم خطوة، وأنا أضمن أنك تبدأ بالطريقة الصح.'
  },
  {
    question: 'هل توفر نظام غذائي؟',
    answer:
      ' نعم. أقدم لك 4 برامج تدريب و4 برامج تغذية مجاناً لتبدأ بشكل قوي ومنظم.\nوإذا كنت تبحث عن مستوى أعلى وتخصيص أدق حسب أهدافك وتفاصيل جسمك، يمكنك الحصول على برنامج متقدم مدفوع يتم تصميمه خصيصاً لك.'
  },
  {
    question: 'كم من الوقت أحتاج حتى أرى نتائج؟',
    answer:
      ' إذا كنت تتدرب بشكل طبيعي (بدون أي منشطات)، يمكنك ملاحظة نتائج واضحة خلال 3 إلى 6 أشهر من الالتزام.\nأما في حال استخدام الهرمونات، فقد تبدأ النتائج بالظهور خلال شهر واحد.\nلكن خلّيها واضحة: النتائج تعتمد أولاً وأخيراً على التزامك أنت، سواء في التمرين أو التغذية أو نمط حياتك.'
  },
  {
    question: 'هل هناك أشخاص لا يمكنك تدريبهم؟',
    answer:
      ' نعم. لا أعمل مع الأشخاص غير الملتزمين بالمواعيد أو الذين لا يحترمون وقت الحصة.\nالانضباط جزء أساسي من النجاح، وإذا لم تكن جاداً في التزامك، فلن تحصل على نتائج — وبالتالي هذا النوع من التدريب ليس مناسباً لك.'
  },
  {
    question: 'كم سعر الحصة التدريبية؟',
    answer:
      ' سعر الحصة هو 20 دينار ليبي.\nهذا يشمل تدريب شخصي مخصص بالكامل حسب مستواك وأهدافك، مع متابعة مستمرة لضمان تحقيق أفضل النتائج في أقصر وقت ممكن.'
  },
  {
    question: 'ماذا أحتاج قبل أن أبدأ؟',
    answer:
      ' قبل بدء التدريب، أقوم بتقييم شامل لحالتك البدنية، يشمل:\n\nفحص وضعية الجسم (Posture)\nتقييم المفاصل والحركة\nمعرفة طبيعة عملك (نشِط أم مكتبي)\nالاطلاع على حالتك الصحية، بما في ذلك أي أمراض مزمنة\n\nبناءً على هذا التقييم، يتم تصميم برنامج تدريبي مناسب لك 100%.'
  }
]

const faqNumberLabels = faqs.map(
  (_faq, index) => `السؤال ${toArabicNumber(index + 1)}`
)

function WhoAmIFaqs () {
  const faqTitleRef = useRef<HTMLHeadingElement | null>(null)
  const [faqTitleVisible, setFaqTitleVisible] = useState(false)
  const [faqItemsVisible, setFaqItemsVisible] = useState<boolean[]>(() =>
    faqs.map(() => false)
  )
  const faqItemRefs = useRef<(HTMLDetailsElement | null)[]>([])

  const handleFaqItemRef = useCallback(
    (index: number, element: HTMLDetailsElement | null) => {
      faqItemRefs.current[index] = element
    },
    []
  )

  useEffect(() => {
    const title = faqTitleRef.current
    if (!title) return

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setFaqTitleVisible(true)
          }
        },
        { threshold: 0.6 }
      )
      observer.observe(title)
      return () => observer.disconnect()
    }

    const onScroll = () => {
      const rect = title.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (inView) {
        setFaqTitleVisible(true)
      }
    }

    const win = window as Window
    onScroll()
    win.addEventListener('scroll', onScroll, { passive: true })
    win.addEventListener('resize', onScroll)
    return () => {
      win.removeEventListener('scroll', onScroll)
      win.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const items = faqItemRefs.current.filter((item): item is HTMLDetailsElement =>
      Boolean(item)
    )
    if (!items.length) return

    const reveal = (target: HTMLElement) => {
      const index = Number(target.dataset.faqIndex)
      if (Number.isNaN(index)) return
      setFaqItemsVisible(current => {
        if (current[index]) return current
        const next = [...current]
        next[index] = true
        return next
      })
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return
            reveal(entry.target as HTMLElement)
            observer.unobserve(entry.target)
          })
        },
        { threshold: 0.3 }
      )

      items.forEach(item => observer.observe(item))
      return () => observer.disconnect()
    }

    const onScroll = () => {
      const viewportHeight = window.innerHeight
      items.forEach(item => {
        const rect = item.getBoundingClientRect()
        if (rect.top < viewportHeight && rect.bottom > 0) {
          reveal(item)
        }
      })
    }

    const win = window as Window
    onScroll()
    win.addEventListener('scroll', onScroll, { passive: true })
    win.addEventListener('resize', onScroll)
    return () => {
      win.removeEventListener('scroll', onScroll)
      win.removeEventListener('resize', onScroll)
    }
  }, [])

  const renderWords = (
    words: string[],
    visible: boolean,
    startDelay: number,
    step: number,
    keyPrefix: string
  ) =>
    words.map((word, index) => (
      <span
        key={`${keyPrefix}-${word}-${index}`}
        className={`about-intro-word ${
          visible ? 'about-intro-word--visible' : ''
        }`}
        style={{
          transitionDelay: `${startDelay + index * step}ms`,
          animationDelay: `${startDelay + index * step}ms`
        }}
      >
        {word}
        {index < words.length - 1 ? '\u00A0' : ''}
      </span>
    ))

  return (
    <div id='faq' className='who-am-i-faqs' aria-label='الأسئلة الشائعة'>
      <h2 ref={faqTitleRef} className='who-am-i-faqs-title'>
        {renderWords(faqTitleWords, faqTitleVisible, 0, wordDelayMs, 'faq')}
      </h2>
      <div className='who-am-i-faqs-list'>
        {faqs.map((faq, index) => (
          <WhoAmIFaqItem
            key={`${faq.question}-${index}`}
            index={index}
            faq={faq}
            isVisible={faqItemsVisible[index]}
            numberLabel={faqNumberLabels[index]}
            revealDelayMs={faqRevealStepMs}
            onSetRef={handleFaqItemRef}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(WhoAmIFaqs)
