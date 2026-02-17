import profileImage from "./assets/images/hellich-hero-image.png"
import StaticGrainBackground from "../utils/StaticGrainBackground"
import Header from "./Header"

function Hellich() {
  return (
    <div className="wrapper">
      <div className="hellich relative pt-8 overflow-visible bg-black rounded-2xl">

        <StaticGrainBackground className="absolute inset-0 rounded-2xl" />

        <Header />

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