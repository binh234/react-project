import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactTags } from 'react-tag-autocomplete'
import { preview } from '../assets'
import { FormField, Loader } from '../components'
import { getRandomPrompt, isValidTag } from '../utils'
import { tagSuggestions } from '../constants'
import { MAX_TAGS } from '../utils/config'

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })
  const [tags, setTags] = useState([])
  const [generatingImage, setGeneratingImage] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImage(true)
        const response = await fetch('http://localhost:8080/api/v1/dall-e', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })
        const data = await response.json()
        if (response.ok) {
          setForm({ ...form, photo: data.photo })
        } else {
          alert('Something went wrong, please try again')
        }
      } catch (error) {
        alert(error)
      } finally {
        setGeneratingImage(false)
      }
    } else {
      alert('Please enter a prompt')
    }
  }

  const generateVariant = async () => {
    if (form.prompt) {
      try {
        setGeneratingImage(true)
        const response = await fetch('http://localhost:8080/api/v1/dall-e/variant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ photo: form.photo }),
        })
        const data = await response.json()
        if (response.ok) {
          setForm({ ...form, photo: data.photo })
        } else {
          alert('Something went wrong, please try again')
        }
      } catch (error) {
        alert(error)
      } finally {
        setGeneratingImage(false)
      }
    } else {
      alert('Please enter a prompt')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.prompt && form.photo && form.name) {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...form,
            tags: tags.map((items) => items.label.toLowerCase()),
          }),
        })
        await response.json()
        navigate('/')
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Please complete the form and generate an image')
    }
  }

  const handleSurprise = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  const onAdd = useCallback(
    (newTag) => {
      setTags([...tags, newTag])
    },
    [tags]
  )

  const onDelete = useCallback(
    (tagIndex) => {
      setTags(tags.filter((_, i) => i !== tagIndex))
    },
    [tags]
  )

  const onValidate = useCallback((value) => isValidTag(value), [])

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-3xl">Create</h1>
        <p className="mt-2 text-[666e75] text-base max-w-[500px]">
          Create your own imaginative and visually stunning images with DALL-E
        </p>
      </div>
      <form className="mt-12 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            handleChange={handleChange}
            required={true}
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
            required={true}
          />
          <div>
            <label htmlFor="tags" className="block text-sm font-semibold text-gray-900 mb-2">
              Tags
            </label>
            <ReactTags
              allowNew
              id="tags"
              selected={tags}
              suggestions={tagSuggestions}
              onAdd={onAdd}
              onDelete={onDelete}
              onValidate={onValidate}
              isInvalid={tags.length > MAX_TAGS}
            />
            <p id="custom-tags-description" className="text-gray-500 text-sm mt-2">
              <em>
                Custom tags must be between 4 and 12 characters in length and only contain the
                letters A-Z
                <br />
                Select a maximum of 10 tags
              </em>
            </p>
          </div>
          <div className="relative bg-gray-50 border-gray-3000 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64 p-3 flex justify-center items-center">
            {form.photo ? (
              <img
                src={`data:image/jpeg;base64,${form.photo}`}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
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
            type="button"
            onClick={generateImage}
            disabled={generatingImage}
            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImage ? 'Generating...' : form.photo ? 'Regenerate' : 'Generate'}
          </button>
          {form.photo && !generatingImage && (
            <button
              type="button"
              onClick={generateVariant}
              disabled={generatingImage}
              className="text-white bg-sky-700 hover:bg-sky-800 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generatingImage ? 'Generating...' : 'Make variant'}
            </button>
          )}
        </div>
        <div className="mt-6 border-t-2 pt-4">
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
