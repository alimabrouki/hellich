import { useEffect, useState } from 'react'

function LibyaTime () {
  const [time, setTime] = useState('')

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('ar-LY', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Africa/Tripoli'
    })

    const updateTime = () => {
      setTime(formatter.format(new Date()))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return <div className='text-sm opacity-60'>{time}</div>
}

export default LibyaTime
