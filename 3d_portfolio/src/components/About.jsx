import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'

const ServiceCard = ({index, title, icon}) => {
  return (
    <Tilt className='w-full'>
      <motion.div variants={fadeIn('right', 'spring', 0.3 * index, 0.75)} className='w-full green-pink-gradient p-[1px] rounded-2xl shadow-card'>
        <div options={{max: 45, scale: 1, speed: 450}} className=' bg-tertiary rounded-2xl py-4 px-6 min-h-[250px] flex justify-evenly items-center flex-col'>
          <img src={icon} alt="icon" className='w-16 h-16 object-contain' />
          <h3 className='text-white text-lg font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-4 text-secondary text-base max-w-3xl"
      >
        I&apos;m a skilled software developer with experience in TypeScript and JavaScript, and
        expertise in frameworks like React, Node.js, and Three.js. I&apos;m a quick learner and
        collaborate closely with clients to create efficient, scalable, and user-friendly solutions
        that solve real-world problems. Let&apos;s work together to bring your ideas to life!
      </motion.p>

      <div className='mt-10 grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6'>
        {services.map((service, idx) => (
          <ServiceCard key={service.title} index={idx} {...service} />
        ))}
      </div>
    </>
  )
}

const wrapper = SectionWrapper(About, "about")

export default wrapper
