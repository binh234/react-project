import { BallCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { technologies } from '../constants'

const Tech = () => {
  return (
    <div className="grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 gap-6">
      {technologies.map((tech) => (
        <div className="flex flex-col justify-center items-center gap-2" key={tech.name}>
          <div className="w-24 h-24">
            <BallCanvas icon={tech.icon} />
          </div>
          <p className="text-white-100 capitalize">{tech.name}</p>
        </div>
      ))}
    </div>
  )
}

const TechWrapper = SectionWrapper(Tech, 'tech')

export default TechWrapper
