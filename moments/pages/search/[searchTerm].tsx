import NoResults from '@/components/NoResults'
import VideoCard from '@/components/VideoCard'
import { Video } from '@/types'
import { BASE_URL } from '@/utils'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineVideocamOff } from 'react-icons/md'

interface IProps {
  videos: Video[]
}

const Search = ({ videos }: IProps) => {
  const [displayTab, setDisplayTab] = useState('Accounts')
  const tabs = useMemo(() => ['Accounts', 'Videos'], [])
  const router = useRouter()
  const { searchTerm } = router.query
  const active = 'border-b-2 border-black'
  const inactive = 'text-gray-400'

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
              {tab}
            </p>
          ))}
        </div>
        <div className="flex gap-6 flex-col md:justify-start">
          {videos.length > 0 ? (
            videos.map((post: Video) => <VideoCard post={post} key={post._id} />)
          ) : (
            <NoResults
              text={`No ${displayTab} found for ${searchTerm}`}
              icon={<MdOutlineVideocamOff />}
            />
          )}
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
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

  return {
    props: { videos: res.data },
  }
}

export default Search
