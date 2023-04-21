import { useRef, useState } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'

const Demo = () => {
  const urlRef = useRef()
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link_icon" className="absolute left-0 my-2 ml-3 w-5" />
          <input
            type="url"
            placeholder="Enter a URL"
            required
            className="url_input peer"
            ref={urlRef}
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>

        {/* Browse URL history */}

      </div>
    </section>
  )
}

export default Demo
