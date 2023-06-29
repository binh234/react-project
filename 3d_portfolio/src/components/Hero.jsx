import { styles } from '../styles'
import { ComputersCanvas } from './canvas'

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="md:px-12 px-4 absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-4">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={styles.heroHeadText}>
            Hi, I&apos;m <span className="text-[#915eff]">Binh</span>
          </h1>
          <p className={`${styles.heroSubText} mt-4`}>
            I develop 3D visuals, user <br className="sm:block hidden" /> interfaces and web
            application
          </p>
        </div>
      </div>
      <ComputersCanvas />

      {/* <div className='absolute xs:bottom-10 bottom-24 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-9 h-16 rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div> */}
    </section>
  )
}

export default Hero
