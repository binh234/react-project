import NoResults from '@/components/NoResults'
import VideoCard from '@/components/VideoCard'
import {IUser, Video} from '@/types'
import {BASE_URL} from '@/utils'
import axios from 'axios'
import Image from 'next/image'
import React, {useEffect, useMemo, useState} from 'react'
import {GoVerified} from 'react-icons/go'
import {MdOutlineVideocamOff} from 'react-icons/md'

interface IProps {
  data: {
    user: IUser
    userVideos: Video[]
    userLikedVideos: Video[]
  }
}

const Profile = ({data: {user, userVideos, userLikedVideos}}: IProps) => {
  const [displayTab, setDisplayTab] = useState('Videos')
  const [videoList, setVideoList] = useState<Video[]>([])
  const tabs = useMemo(() => ['Videos', 'Liked'], [])
  const active = 'border-b-2 border-black'
  const inactive = 'text-gray-400'

  useEffect(() => {
    if (displayTab === tabs[0]) {
      setVideoList(userVideos)
    } else if (displayTab === tabs[1]) {
      setVideoList(userLikedVideos)
    }
  }, [displayTab, tabs, userVideos, userLikedVideos])

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
          {videoList.length > 0 ? (
            videoList.map((post: Video) => <VideoCard post={post} key={post._id} />)
          ) : (
            <NoResults text="No videos yet" icon={<MdOutlineVideocamOff />} />
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({params: {id}}: {params: {id: string}}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

  return {
    props: {data: res.data},
  }
}

export default Profile
