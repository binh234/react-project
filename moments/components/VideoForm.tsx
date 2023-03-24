import { createDocument, deleteDocument, updateDocument, uploadAsset } from '@/utils/client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { FaCloudUploadAlt, FaMarkdown } from 'react-icons/fa'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '@/utils/constants'
import { useRouter } from 'next/router'
import { ClipLoader } from 'react-spinners'
import BeatLoader from 'react-spinners/BeatLoader'
import rehypeSanitize from 'rehype-sanitize'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import { Video } from '@/types'
import { MdErrorOutline, MdOutlineCancel } from 'react-icons/md'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import NoResults from './NoResults'
import { FileUploader } from 'react-drag-drop-files'
import { MAX_FILE_SIZE } from '@/utils/config'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
})
interface IProps {
  post?: Video
}

const VideoForm = ({ post }: IProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
  const [videoUrl, setVideoUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [savingPost, setSavingPost] = useState(false)
  const [content, setContent] = React.useState('')
  const categoryRef = useRef<HTMLSelectElement>(null)
  const { data: session } = useSession()
  const fileTypes = ['mp4', 'webm', 'ogg']

  // Update route
  useEffect(() => {
    if (post) {
      setContent(post.content)
      if (categoryRef.current) {
        categoryRef.current.value = post.topic
      }
      setVideoUrl(post.video.asset.url)
    }
  }, [post])

  if (!session) {
    return <NoResults text="Please login to continue" icon={<MdErrorOutline />} />
  }
  const { user } = session

  const handleChange = (newContent: string | undefined) => {
    setContent(newContent || '')
  }

  const handleUpload = async (file: File) => {
    const fileType = file.type.split('/')[1]
    if (fileTypes.includes(fileType)) {
      uploadAsset(file).then((data) => {
        setVideoAsset(data)
        setIsLoading(false)
      })
      setIsLoading(true)
      setErrorMessage('')
    } else {
      setIsLoading(false)
      setErrorMessage('Please select a video file')
    }
  }

  const discardVideo = async () => {
    if (videoAsset) {
      try {
        await deleteDocument(videoAsset._id)
      } catch (e) {
        console.log(e)
      }
      setVideoAsset(undefined)
    }
    setVideoUrl('')
  }

  const handleDiscard = async () => {
    categoryRef.current!.value = topics[0].name
    setContent('')
    await discardVideo()
  }

  const handlePost = async (e: FormEvent) => {
    e.preventDefault()
    if (content && categoryRef.current!.value && (videoAsset?._id || videoUrl !== '')) {
      setSavingPost(true)
      const document = {
        _type: 'post',
        content: content,
        topic: categoryRef.current!.value,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id || post?.video.asset._id,
          },
        },
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
      }
      let action
      if (post) {
        action = updateDocument(post._id, document)
      } else {
        action = createDocument(document)
      }
      action
        .then(() => {
          router.push('/')
        })
        .catch((e) => {
          alert('Something wrong, please try again')
          setSavingPost(false)
          console.log(e)
        })
    }
  }

  return (
    <form className="flex flex-col gap-6 justify-center mt-10" onSubmit={handlePost}>
      <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none h-[460px] p-10 hover:border-red-300 hover:bg-gray-100">
        {isLoading ? (
          <>
            <BeatLoader
              color="fuchsia"
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p className="p-2">Uploading..</p>
          </>
        ) : (
          <>
            {videoAsset || videoUrl !== '' ? (
              <div className="relative">
                <div className="absolute top-2 left-2 z-50">
                  <p
                    className="cursor-pointer text-[#F51997] hover:text-[#da1685]"
                    onClick={discardVideo}
                  >
                    <MdOutlineCancel className="text-[32px]" />
                  </p>
                </div>
                <video
                  className="rounded-xl h-[400px] bg-black"
                  src={videoAsset?.url || post?.video.asset.url}
                  loop
                  controls
                />
              </div>
            ) : (
              <FileUploader
                types={fileTypes}
                onTypeError={() => {
                  setErrorMessage('Please select a video file')
                }}
                maxSize={MAX_FILE_SIZE}
                onSizeError={() => {
                  setErrorMessage(`Please select a file less than ${MAX_FILE_SIZE}MB`)
                }}
                name="upload-video"
                handleChange={handleUpload}
                classes="w-full"
                required={true}
              >
                <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold text-xl">
                      <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                    </p>
                    <p className="text-xl font-semibold text-center">
                      Drop your video here
                      <br />
                      Or browse from your device
                    </p>
                  </div>
                  <p className="text-gray-400 text-center mt-6 text-sm leading-10">
                    MP4 or WebM or ogg <br />
                    720x1280 or higher <br />
                    Up to 10 minutes <br />
                    Less then {MAX_FILE_SIZE}MB
                  </p>
                  <p className="bg-[#F51997] text-center mt-6 rounded text-white text-base font-medium p-2 w-52 outline-none hover:bg-[#da1685]">
                    Select File
                  </p>
                </div>
              </FileUploader>
            )}
          </>
        )}
        {errorMessage !== '' && (
          <p className="text-center text-xl text-red-500 font-semibold mt-4 w-auto">
            {errorMessage}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3 pb-10">
        <div className="flex flex-row justify-between">
          <label className="text-base font-medium">Content</label>
          <Link
            href="https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
            className="flex flex-row gap-0.5 items-center text-sm hover:text-blue-500 hover:underline"
          >
            <FaMarkdown className="text-base" />
            Markdown supported
          </Link>
        </div>
        <MDEditor
          height={300}
          value={content}
          onChange={handleChange}
          className="ml-1"
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
        <label className="text-base font-medium">Choose a category</label>
        <select
          className="outline-none border-2 border-gray-200 text-base capitalize p-2 rounded cursor-pointer"
          ref={categoryRef}
        >
          {topics.map((topic) => (
            <option key={topic.name}>{topic.name}</option>
          ))}
        </select>
        <div className="flex gap-6 mt-10">
          <button
            className="border-gray-300 border-2 text-base font-medium p-2 rounded w-28 lg:w-44 outline-none hover:bg-primary hover:border-gray-500"
            onClick={handleDiscard}
            disabled={savingPost}
          >
            Discard
          </button>
          {savingPost ? (
            <button
              className=" flex flex-row gap-2 items-center justify-center bg-gray-400 text-white border-gray-300 border-2 text-base font-medium p-2 rounded w-28 lg:w-44 outline-none"
              disabled
            >
              <ClipLoader
                color="fuchsia"
                size={30}
                aria-label="Saving Spinner"
                data-testid="saver"
              />{' '}
              <p>Saving..</p>
            </button>
          ) : (
            <button
              className="bg-[#F51997] text-white border-gray-300 border-2 text-base font-medium p-2 rounded w-28 lg:w-44 outline-none hover:bg-[#da1685]"
              type="submit"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default VideoForm
