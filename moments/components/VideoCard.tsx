import {Video} from '@/types'
import {NextPage} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {GoVerified} from 'react-icons/go'
import ReactPlayer from 'react-player/lazy'

interface IProps {
  post: Video
}

const VideoCard: NextPage<IProps> = ({post}) => {
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div className="flex gap-3 p-2 cursor-progress font-semibold rounded">
        <div className="md:w-16 md:h-16 w-10 h-10">
          <Link href={`/profile/${post.postedBy._id}`}>
            <Image
              width={48}
              height={48}
              className="rounded-full"
              src={post.postedBy.image}
              alt={post._id}
            />
          </Link>
        </div>
        <div>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex items-center gap-2">
              <p className="flex gap-2 items-center md:text-lg text-primary font-bold">
                {post.postedBy.userName} {` `}
                <GoVerified className="text-blue-400 text-lg" />
              </p>
              <p className="capitalize font-medium text-sm text-gray-500 hidden md:block">
                {post.postedBy.userName}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <Link href={`/detail/${post._id}`}>
        <div className="lg:ml-20 mr-4 flex gap-4 relative rounded-3xl lg:w-[600px] w-auto h-[300px] md:h-[400px] lg:h-[500px] cursor-pointer bg-gray-100 items-center">
          <video src={post.video.asset.url} loop controls />
        </div>
      </Link>
    </div>
  )
}

export default VideoCard
