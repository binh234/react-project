import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import { styles } from '../styles'
import { EarthCanvas } from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'

const Contact = () => {
  const formRef = useRef()
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    emailjs
      .send(
        'service_zqs1bfd',
        'template_712rude',
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          to_name: 'Binh Le',
          to_email: 'binhnd234@gmail.com',
        },
        'gn8N21y125VArIPGh'
      )
      .then(
        () => {
          setLoading(false)
          alert('Thank you. I will get bakc to you as soon as possible')
          setForm({
            name: '',
            email: '',
            message: '',
          })
        },
        (error) => {
          console.log(error)
          setLoading(false)
          alert('Something went wrong. Please try again later!')
        }
      )
  }

  return (
    <div className="xl:mt-4 xl:flex-row flex-col-reverse flex gap-8 overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h2 className={styles.sectionHeadText}>Contact</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-4">
            <span className="text-white font-medium">Your name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 text-white rounded-xl outline-none placeholder:text-secondary border-none font-medium"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-white font-medium">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 text-white rounded-xl outline-none placeholder:text-secondary border-none font-medium"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-white font-medium">Your message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 text-white rounded-xl outline-none placeholder:text-secondary border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-6 text-white font-bold shadow-md shadow-primary rounded-2xl w-fit outline-none hover:bg-black-200"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

const ContactWrapper = SectionWrapper(Contact, 'contact')

export default ContactWrapper
