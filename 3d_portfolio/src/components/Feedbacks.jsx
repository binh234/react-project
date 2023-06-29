import { motion } from 'framer-motion'
import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { fadeIn, textVariant } from '../utils/motion'
import { testimonials } from '../constants'

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => {
  return (
    <motion.div
      className="w-full bg-black-200 p-4 rounded-2xl"
      variants={fadeIn('right', 'spring', 0.3 * index, 0.75)}
    >
      <p className="text-white text-6xl font-bold">&quot;</p>
      <div>
        <p className="text-secondary text-lg tracking-wider">{testimonial}</p>
        <div className="mt-4 flex flex-row justify-between items-center gap-1">
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-white font-medium text-base">
              <span className="blue-text-gradient">@</span> {name}
            </p>
            <p className="text-secondary text-xs">
              {designation} of {company}
            </p>
          </div>
          <img src={image} alt="photo" className="rounded-full w-12 h-12 object-cover" />
        </div>
      </div>
    </motion.div>
  )
}

const Feedbacks = () => {
  return (
    <div className=" bg-tertiary rounded-2xl px-4 py-6">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What others say</p>
        <h2 className={styles.sectionHeadText}>Testinomials</h2>
      </motion.div>
      <div className="mt-10 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {testimonials.map((testimonial, idx) => (
          <FeedbackCard key={idx} index={idx} {...testimonial} />
        ))}
      </div>
    </div>
  )
}

const FeedbacksWrapper = SectionWrapper(Feedbacks, 'feedbacks')

export default FeedbacksWrapper
