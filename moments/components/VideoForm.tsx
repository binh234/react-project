import { client } from '@/utils/client'
import React, { FormEvent, useRef, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '@/utils/constants'
import useAuthStore from '@/store/authStore'
import axios from 'axios'
import { useRouter } from 'next/router'
import { BASE_URL } from '@/utils'
import { ClipLoader } from 'react-spinners'
import BeatLoader from 'react-spinners/BeatLoader'

const VideoForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
  const [wrongFileType, setWrongFileType] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const captionRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLSelectElement>(null)

  const { userProfile }: { userProfile: any } = useAuthStore()

  if (!userProfile) {
    return <div>Login to continue</div>
  }

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0]
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data)
          setIsLoading(false)
        })
      setIsLoading(true)
      setWrongFileType(false)
    } else {
      setIsLoading(false)
      setWrongFileType(true)
    }
  }

  const deleteVideo = async (id: string) => {
    try {
      await client.delete(id)
    } catch (e) {
      console.log(e)
    }
  }

  const handleDiscard = async () => {
    captionRef.current!.value = ''
    categoryRef.current!.value = topics[0].name
    if (videoAsset) {
      await deleteVideo(videoAsset._id)
      setVideoAsset(undefined)
    }
  }

  const handlePost = async (e: FormEvent) => {
    e.preventDefault()
    if (
      userProfile?._id &&
      videoAsset?._id &&
      captionRef.current!.value &&
      categoryRef.current!.value
    ) {
      setSavingPost(true)
      const document = {
        _type: 'post',
        caption: captionRef.current!.value,
        topic: categoryRef.current!.value,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
      }
      try {
        const response = await axios.post(`${BASE_URL}/api/post`, document)
        if (response.status === 200) {
          router.push('/')
        } else {
          alert('Something wrong, please try again')
          setSavingPost(false)
        }
      } catch (error: any) {
        if (error.response) {
          console.log('Status code:', error.response.status)
        } else {
          console.log('Error:', error.message)
        }
        alert(error.message)
        setSavingPost(false)
      }
    }
  }
  return (
    <form className="flex flex-col lg:flex-row gap-6 justify-center mt-10" onSubmit={handlePost}>
      <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none h-[460px] lg:w-[300px] lg:flex-grow p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
        {isLoading ? (
          <>
            <BeatLoader
              color="fuchsia"
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <p className="p-2">Uploading..</p>
          </>
        ) : (
          <div>
            {videoAsset ? (
              <div>
                <video
                  className="rounded-xl h-[400px] bg-black"
                  src={videoAsset.url}
                  loop
                  controls
                ></video>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-bold text-xl">
                      <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                    </p>
                    <p className="text-xl font-semibold">Upload video</p>
                  </div>
                  <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                    MP4 or WebM or ogg <br />
                    720x1280 or higher <br />
                    Up to 10 minutes <br />
                    Less then 100MB
                  </p>
                  <p className="bg-[#F51997] text-center mt-10 rounded text-white text-base font-medium p-2 w-52 outline-none hover:bg-[#da1685]">
                    Select File
                  </p>
                </div>
                <input type="file" name="upload-video" className="w-0 h-0" onChange={uploadVideo} />
              </label>
            )}
          </div>
        )}
        {wrongFileType && (
          <p className="text-center text-xl text-red-500 font-semibold mt-4 w-[250px]">
            Please select a video file
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3 pb-10">
        <label className="text-base font-medium">Caption</label>
        <input
          type="text"
          className="rounded outline-none text-base border-2 border-gray-200 p-2 w-full"
          ref={captionRef}
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
              className=" flex flex-row items-center bg-gray-400 text-white border-gray-300 border-2 text-base font-medium p-2 rounded w-28 lg:w-44 outline-none"
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
              Post
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default VideoForm
