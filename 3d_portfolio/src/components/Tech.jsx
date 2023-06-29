import {BallCanvas} from './canvas'
import { SectionWrapper } from '../hoc'
import { technologies } from '../constants'

const Tech = () => {
  return (
    <div className='grid lg:grid-cols-10 md:grid-cols-8 sm:grid-cols-6 xs:grid-cols-4 grid-cols-2 gap-6'>
      {technologies.map((tech) => (
        <div className='w-24 h-24' key={tech.name}>
          <BallCanvas icon={tech.icon} />
        </div>
      ))}
    </div>
  )
}

const TechWrapper = SectionWrapper(Tech, 'tech')

export default TechWrapper
