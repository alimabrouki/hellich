import { memo, useCallback, useRef, type CSSProperties, type SyntheticEvent, type TransitionEvent } from 'react'

type FaqItem = {
  question: string
  answer: string
}

type WhoAmIFaqItemProps = {
  index: number
  faq: FaqItem
  isVisible: boolean
  numberLabel: string
  revealDelayMs: number
  onSetRef: (index: number, element: HTMLDetailsElement | null) => void
}

function WhoAmIFaqItem ({
  index,
  faq,
  isVisible,
  numberLabel,
  revealDelayMs,
  onSetRef
}: WhoAmIFaqItemProps) {
  const handleRef = useCallback(
    (element: HTMLDetailsElement | null) => {
      onSetRef(index, element)
    },
    [index, onSetRef]
  )

  const panelRef = useRef<HTMLDivElement | null>(null)
  const handleToggle = useCallback(
    (event: SyntheticEvent<HTMLDetailsElement>) => {
      const panel = panelRef.current
      if (!panel) return
      const details = event.currentTarget
      const height = panel.scrollHeight

      if (details.open) {
        panel.style.height = '0px'
        requestAnimationFrame(() => {
          panel.style.height = `${height}px`
        })
      } else {
        panel.style.height = `${height}px`
        requestAnimationFrame(() => {
          panel.style.height = '0px'
        })
      }
    },
    []
  )

  const handleTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.propertyName !== 'height') return
      const panel = panelRef.current
      if (!panel) return
      const details = panel.closest('details')
      if (details?.open) {
        panel.style.height = 'auto'
      }
    },
    []
  )

  const revealStyle = {
    '--reveal-delay': `${index * revealDelayMs}ms`
  } as CSSProperties

  return (
    <details
      className={`who-am-i-faq ${isVisible ? 'who-am-i-faq--visible' : ''}`}
      style={revealStyle}
      data-faq-index={index}
      ref={handleRef}
      onToggle={handleToggle}
    >
      <summary className='who-am-i-faq-button'>
        <span className='who-am-i-faq-text'>
          <span className='who-am-i-faq-number'>{numberLabel}</span>
          <span className='who-am-i-faq-question'>{faq.question}</span>
        </span>
        <span className='who-am-i-faq-icon' aria-hidden='true'>
          <span className='who-am-i-faq-arrow' />
        </span>
      </summary>
      <div
        id={`faq-panel-${index}`}
        className='who-am-i-faq-panel'
        ref={panelRef}
        onTransitionEnd={handleTransitionEnd}
      >
        <p className='who-am-i-faq-answer'>{faq.answer}</p>
      </div>
    </details>
  )
}

export default memo(WhoAmIFaqItem)
