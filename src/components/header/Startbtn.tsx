import { Link } from 'react-router'

function StartBtn () {
  return (
    <Link
      className='hidden lg:bg-head-btn rounded-2xl lg:px-6 lg:py-0 lg:flex items-center lg:my-1.75 font-bold lg:mr-auto lg:ml-5'
      to={'/'}
    >
      إبدأ الآن
    </Link>
  )
}

export default StartBtn
