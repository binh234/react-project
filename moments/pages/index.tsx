import NoResults from '@/components/NoResults'
import VideoCard from '@/components/VideoCard'
import { Video } from '@/types'
import { BASE_URL } from '@/utils'
import axios, { AxiosResponse } from 'axios'
import Head from 'next/head'
import { MdOutlineVideocamOff } from 'react-icons/md'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PropagateLoader } from 'react-spinners'
import { MAX_RESULT } from '@/utils/config'
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })

interface IProps {
  baseVideos: Video[]
  topic?: string
  lastCreated: string
}

export default function Home({ topic, baseVideos, lastCreated }: IProps) {
  const [videos, setVideos] = useState(baseVideos)
  const [page, setPage] = useState(0)
  const [lastCreatedAt, setLastCreatedAt] = useState(lastCreated)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef(null)

  const handleObserver = (entries: any[]) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setPage((page) => page + 1)
    }
  }

  const getVideos = useCallback(
    async (override: boolean = false, lastCreatedAt: string) => {
      if (lastCreatedAt) {
        setIsLoading(true)
        let response: AxiosResponse
        if (topic) {
          response = await axios.get(`${BASE_URL}/api/discover/${topic}`, {
            params: { maxResults: MAX_RESULT, lastCreatedAt: lastCreatedAt },
          })
        } else {
          response = await axios.get(`${BASE_URL}/api/post`, {
            params: { maxResults: MAX_RESULT, lastCreatedAt: lastCreatedAt },
          })
        }
        const { data } = response as { data: Video[] }
        if (data.length > MAX_RESULT) {
          setLastCreatedAt(data[data.length - 1]._createdAt)
        } else {
          setLastCreatedAt('') // Reached the end
        }
        console.log(lastCreatedAt)
        setVideos((videos) => (override ? data : [...videos, ...data]))
        setIsLoading(false)
      }
    },
    [topic]
  )

  useEffect(() => {
    setVideos(baseVideos)
    setLastCreatedAt(lastCreated)
  }, [baseVideos, lastCreated])

  useEffect(() => {
    if (page > 0) {
      getVideos(false, lastCreatedAt)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

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

  return (
    <>
      <Head>
        <title>Moments</title>
      </Head>
      <main>
        <div>
          <div className="flex flex-col gap-10 videos h-full">
            {videos.length ? (
              videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
            ) : (
              <NoResults text="No Videos" icon={<MdOutlineVideocamOff />} />
            )}
            {lastCreatedAt &&
              (isLoading ? (
                <div className="flex w-full justify-center">
                  <PropagateLoader color="fuchsia" size={15} aria-label="Load more Spinner" />
                </div>
              ) : (
                <div ref={loaderRef} />
              ))}
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async ({ query: { topic } }: { query: { topic: string } }) => {
  let response = null
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`, {
      params: { maxResults: MAX_RESULT },
    })
  } else {
    response = await axios.get(`${BASE_URL}/api/post`, {
      params: { maxResults: MAX_RESULT },
    })
  }

  const { data } = response
  let lastCreated = ''
  if (data.length >= MAX_RESULT + 1) {
    lastCreated = data[data.length - 1]._createdAt
  }
  return {
    props: {
      topic: topic || null,
      baseVideos: data,
      lastCreated: lastCreated,
    },
  }
}
