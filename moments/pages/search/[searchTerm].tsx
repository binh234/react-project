import AccountCard from '@/components/AccountCard'
import NoResults from '@/components/NoResults'
import VideoCard from '@/components/VideoCard'
import { IUser, Video } from '@/types'
import { BASE_URL } from '@/utils'
import { MAX_RESULT } from '@/utils/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MdOutlineNoAccounts, MdOutlineVideocamOff } from 'react-icons/md'
import { PropagateLoader } from 'react-spinners'

interface IProps {
  videoResults: Video[]
  accountResults: IUser[]
}

const Search = ({ videoResults, accountResults }: IProps) => {
  const [videos, setVideos] = useState(videoResults)
  const [videoLastCreatedAt, setVideoLastCreatedAt] = useState('')
  const [accounts, setAccounts] = useState(accountResults)
  const [accountLastId, setAccountLastId] = useState('')
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef(null)
  const tabs = useMemo(() => ['Video', 'Account'], [])
  const [displayTab, setDisplayTab] = useState(tabs[0])
  const router = useRouter()
  const { searchTerm } = router.query
  const active = 'border-b-2 border-black'
  const inactive = 'text-gray-400'
  const showMore =
    (videoLastCreatedAt && displayTab === tabs[0]) || (accountLastId && displayTab === tabs[1])

  const handleObserver = (entries: any[]) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setPage((page) => page + 1)
    }
  }

  const getVideos = async (override: boolean = false) => {
    if (!isLoading && videoLastCreatedAt) {
      setIsLoading(true)
      let response = await axios.get(`${BASE_URL}/api/search/${searchTerm}`, {
        params: {
          type: 'post',
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

  const getAccounts = async (override: boolean = false) => {
    if (!isLoading && accountLastId) {
      setIsLoading(true)
      let response = await axios.get(`${BASE_URL}/api/search/${searchTerm}`, {
        params: {
          type: 'user',
          maxResults: MAX_RESULT,
          lastId: accountLastId,
        },
      })
      // Accounts
      const { data } = response as { data: IUser[] }
      if (data.length > MAX_RESULT) {
        setAccountLastId(data[data.length - 1]._createdAt)
      } else {
        setAccountLastId('') // Reached the end
      }
      setAccounts((accounts) => (override ? data : [...accounts, ...data]))
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setVideos(videoResults)
    setAccounts(accountResults)

    if (videoResults.length > MAX_RESULT) {
      setVideoLastCreatedAt(videoResults[videoResults.length - 1]._createdAt)
    } else {
      setVideoLastCreatedAt('')
    }

    if (accountResults.length > MAX_RESULT) {
      setAccountLastId(accountResults[accountResults.length - 1]._id)
    } else {
      setAccountLastId('')
    }
  }, [videoResults, accountResults])

  useEffect(() => {
    if (page > 1) {
      if (displayTab === tabs[0]) {
        getVideos(false)
      } else {
        getAccounts(false)
      }
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
    <div className="w-full">
      <div>
        <div className="flex gap-8 my-8 border-b-2 border-gray-200 bg-white w-full">
          {tabs.map((tab) => (
            <p
              key={tab}
              className={`text-lg font-semibold cursor-pointer mt-2 ${
                displayTab === tab ? active : inactive
              }`}
              onClick={() => setDisplayTab(tab)}
            >
              {tab}s
            </p>
          ))}
        </div>
        <div className="flex gap-4 flex-col md:justify-start">
          {displayTab === tabs[0] &&
            (videos.length > 0 ? (
              videos.map((post: Video) => <VideoCard post={post} key={post._id} />)
            ) : (
              <NoResults
                text={`No ${displayTab} found for ${searchTerm}`}
                icon={<MdOutlineVideocamOff />}
              />
            ))}
          {displayTab === tabs[1] &&
            (accounts.length > 0 ? (
              accounts.map((user) => <AccountCard user={user} key={user._id} />)
            ) : (
              <NoResults
                text={`No ${displayTab} found for ${searchTerm}`}
                icon={<MdOutlineNoAccounts />}
              />
            ))}
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

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string }
}) => {
  const videoPromise = axios.get(`${BASE_URL}/api/search/${searchTerm.toLowerCase()}`, {
    params: { maxResults: MAX_RESULT },
  })
  const accountPromise = axios.get(`${BASE_URL}/api/search/${searchTerm.toLowerCase()}`, {
    params: { maxResults: MAX_RESULT, type: 'user' },
  })
  const [videos, accounts] = await Promise.all([videoPromise, accountPromise])

  return {
    props: {
      videoResults: videos.data,
      accountResults: accounts.data,
    },
  }
}

export default Search
