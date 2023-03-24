import NoResults from '@/components/NoResults'
import VideoCard from '@/components/VideoCard'
import { IUser, Video } from '@/types'
import { BASE_URL } from '@/utils'
import { deleteDocument } from '@/utils/client'
import { MAX_RESULT } from '@/utils/config'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { GoVerified } from 'react-icons/go'
import { MdOutlineVideocamOff } from 'react-icons/md'
import { PropagateLoader } from 'react-spinners'

interface IProps {
  user: IUser
  userVideos: Video[]
  userLikedVideos: Video[]
}

const Profile = ({ user, userVideos, userLikedVideos }: IProps) => {
  const [videos, setVideos] = useState(userVideos)
  const [videoLastCreatedAt, setVideoLastCreatedAt] = useState('')
  const [likedVideos, setLikedVideos] = useState(userLikedVideos)
  const [likedVideoLastCreatedAt, setLikedVideoLastCreatedAt] = useState('')
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef(null)
  const [videoList, setVideoList] = useState<Video[]>([])
  const tabs = useMemo(() => ['video', 'liked'], [])
  const [displayTab, setDisplayTab] = useState(tabs[0])
  const showMore =
    (displayTab === tabs[0] && videoLastCreatedAt) ||
    (displayTab === tabs[1] && likedVideoLastCreatedAt)
  const active = 'border-b-2 border-black'
  const inactive = 'text-gray-400'

  const handleObserver = (entries: any[]) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setPage((page) => page + 1)
    }
  }

  const getVideos = async (override: boolean = false) => {
    if (!isLoading && videoLastCreatedAt) {
      setIsLoading(true)
      let response = await axios.get(`${BASE_URL}/profile/video/${user._id}`, {
        params: {
          maxResults: MAX_RESULT,
          lastCreatedAt: videoLastCreatedAt,
        },
      })
      // Videos
      const { data } = response as { data: Video[] }
      if (data.length > MAX_RESULT) {
        setVideoLastCreatedAt(data[data.length - 1]._createdAt)
      } else {
        setVideoLastCreatedAt('') // Reached the end
      }
      setVideos((videos) => (override ? data : [...videos, ...data]))
      setIsLoading(false)
    }
  }

  const getLikedVideos = async (override: boolean = false) => {
    if (!isLoading && likedVideoLastCreatedAt) {
      setIsLoading(true)
      let response = await axios.get(`${BASE_URL}/profile/liked/${user._id}`, {
        params: {
          maxResults: MAX_RESULT,
          lastCreatedAt: likedVideoLastCreatedAt,
        },
      })
      // Videos
      const { data } = response as { data: Video[] }
      if (data.length > MAX_RESULT) {
        setLikedVideoLastCreatedAt(data[data.length - 1]._createdAt)
      } else {
        setLikedVideoLastCreatedAt('') // Reached the end
      }
      setLikedVideos((videos) => (override ? data : [...videos, ...data]))
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setVideos(userVideos)
    setLikedVideos(userLikedVideos)

    if (userVideos.length > MAX_RESULT) {
      setVideoLastCreatedAt(userVideos[userVideos.length - 1]._createdAt)
    } else {
      setVideoLastCreatedAt('')
    }

    if (userLikedVideos.length > MAX_RESULT) {
      setLikedVideoLastCreatedAt(userLikedVideos[userLikedVideos.length - 1]._id)
    } else {
      setLikedVideoLastCreatedAt('')
    }
  }, [userVideos, userLikedVideos])

  useEffect(() => {
    if (page > 1) {
      if (displayTab === tabs[0]) {
        getVideos(false)
      } else {
        getLikedVideos(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (displayTab === tabs[0]) {
      setVideoList(videos)
    } else if (displayTab === tabs[1]) {
      setVideoList(likedVideos)
    }
  }, [displayTab, tabs, videos, likedVideos])

  useEffect(() => {
    let observerRefValue: Element | null = null
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(handleObserver, options)

    if (loaderRef && loaderRef.current) {
      observerRefValue = loaderRef.current
      observer.observe(observerRefValue)
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue)
      }
    }
  }, [])

  async function deletePost(id: string) {
    deleteDocument(id)
    setVideos((videos) => videos.filter((item) => item._id !== id))
    setLikedVideos((likedVideos) => likedVideos.filter((item) => item._id !== id))
  }

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-28 md:h-28">
          <Image
            width={128}
            height={128}
            className="rounded-full"
            src={user.image}
            alt={user._id}
          />
        </div>

        <div>
          <p className="flex gap-1 items-center text-lg md:text-2xl font-bold text-primary lowercase tracking-wider">
            {user.userName.replaceAll(' ', '')} <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 text-sm md:text-lg font-semibold">
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-8 my-8 border-b-2 border-gray-200 bg-white w-full">
          {tabs.map((tab) => (
            <p
              key={tab}
              className={`text-lg font-semibold cursor-pointer mt-2 capitalize ${
                displayTab === tab ? active : inactive
              }`}
              onClick={() => setDisplayTab(tab)}
            >
              {tab}
            </p>
          ))}
        </div>
        <div className="flex gap-4 flex-col md:justify-start">
          {videoList.length > 0 ? (
            videoList.map((post: Video) => (
              <VideoCard post={post} key={post._id} deletePost={deletePost} />
            ))
          ) : (
            <NoResults text="No videos yet" icon={<MdOutlineVideocamOff />} />
          )}
          {showMore &&
            (isLoading ? (
              <div className="flex w-full justify-center">
                <PropagateLoader color="fuchsia" size={15} aria-label="Load more Spinner" />
              </div>
            ) : (
              <div ref={loaderRef} />
            ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const userPromise = axios.get(`${BASE_URL}/api/profile/${id}`)
  const videosPromise = axios.get(`${BASE_URL}/api/profile/video/${id}`, {
    params: { maxResults: MAX_RESULT },
  })
  const likedPromise = axios.get(`${BASE_URL}/api/profile/liked/${id}`, {
    params: { maxResults: MAX_RESULT },
  })

  const [userResponse, videosResponse, likedResponse] = await Promise.all([
    userPromise,
    videosPromise,
    likedPromise,
  ])

  if (!userResponse.data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: userResponse.data,
      userVideos: videosResponse.data,
      userLikedVideos: likedResponse.data,
    },
  }
}

export default Profile
