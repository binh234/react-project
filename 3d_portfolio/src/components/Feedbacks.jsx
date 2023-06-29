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
      {/* <div className="relative w-full h-[230px]">
        <img src={image} alt="thumbnail" className="w-full h-full object-contain rounded-2xl" />
        <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
          <div
            onClick={() => window.open(source_code_link, '_blank')}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img src={github} alt="github" className="w-3/5 h-3/5 object-contain" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-white text-lg font-bold">{name}</h3>
        <p className="mt-2 text-secondary text-sm">{description}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <p key={idx} className={`text-sm ${tag.color || 'text-white'}`}>
            #{tag.name}
          </p>
        ))}
      </div> */}
    </motion.div>
  )
}

const Feedbacks = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What others say</p>
        <h2 className={styles.sectionHeadText}>Testinomials</h2>
      </motion.div>
      <div className="mt-10 flex flex-wrap gap-7">
        {testimonials.map((testimonial, idx) => (
          <FeedbackCard key={idx} index={idx} {...testimonial} />
        ))}
      </div>
    </>
  )
}

const FeedbacksWrapper = SectionWrapper(Feedbacks, 'feedbacks')

export default FeedbacksWrapper
