import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { FormField, Loader } from '../components'
import { getRandomPrompt } from '../utils'

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })
  const [generatingImage, setGeneratingImage] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateImage = () => {}

  const handleChange = (e) => {
    setForm({ ...form, [e.targe.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleSurprise = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-3xl">Create</h1>
        <p className="mt-2 text-[666e75] text-base max-w-[500px]">
          Create your own imaginative and visually stunning images with DALL-E
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Your prompt"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurprise={handleSurprise}
          />
          <div className="relative bg-gray-50 border-gray-3000 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64 p-3 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImage && (
              <div className="absolute inet-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="submit"
            onClick={generateImage}
            disabled={generatingImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImage ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className="mt-10">
          <p className="text-[#666e75] text-sm">
            Once you have created the image you want, you can share it with others in the community
          </p>
          <button
            type="submit"
            disabled={loading}
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
