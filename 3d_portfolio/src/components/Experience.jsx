import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { motion } from 'framer-motion'
import 'react-vertical-timeline-component/style.min.css'

import { styles } from '../styles'
import { experiences } from '../constants'
import { SectionWrapper } from '../hoc'
import { textVariant } from '../utils/motion'

const ExperienceCard = ({ title, company_name, icon, iconBg, date, points }) => (
  <VerticalTimelineElement
    contentStyle={{ background: '#1d1836', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #232631' }}
    date={date}
    iconStyle={{ background: iconBg }}
    icon={
      <div className='flex justify-center items-center w-full h-full'>
        <img src={icon} alt={company_name} className="w-3/5 h-3/5 object-contain" />
      </div>
    }
  >
    <div>
      <h3 className='text-white text-2xl font-bold'>{title}</h3>
      <p className='text-secondary text-sm font-semibold' style={{margin: 0}}>{company_name}</p>
      <ul className='mt-4 list-disc ml-4 space-y-2'>
        {points.map((point, idx) => (
          <li key={idx} className='text-white-100 text-sm pl-1 tracking-wider'>
            {point}
          </li>
        ))}
      </ul>
    </div>
  </VerticalTimelineElement>
)

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience</h2>
      </motion.div>
      <div className="mt-10 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, idx) => (
            <ExperienceCard key={idx} {...experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

const ExperienceWrapper = SectionWrapper(Experience, 'experience')

export default ExperienceWrapper
