import { useCallback, useRef, type CSSProperties } from 'react'

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

  const revealStyle = {
    '--reveal-delay': `${index * revealDelayMs}ms`
  } as CSSProperties

  return (
    <details
      className={`who-am-i-faq ${isVisible ? 'who-am-i-faq--visible' : ''}`}
      style={revealStyle}
      data-faq-index={index}
      ref={handleRef}
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
      <div id={`faq-panel-${index}`} className='who-am-i-faq-panel'>
        <p className='who-am-i-faq-answer'>{faq.answer}</p>
      </div>
    </details>
  )
}

export default WhoAmIFaqItem
