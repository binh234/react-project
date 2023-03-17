import { Video } from '@/types'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GoVerified } from 'react-icons/go'
import ReactPlayer from 'react-player/lazy'

interface IProps {
  post: Video
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  return (
    <div className="flex flex-col gap-2 border-b-2 border-gray-200 pb-6">
      <div className="flex gap-3 p-2 cursor-progress font-semibold rounded">
        <div className="md:w-12 md:h-12 w-10 h-10">
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

      <div className="px-2 text-small md:text-base">{post.caption}</div>

      <Link href={`/detail/${post._id}`}>
        <div className="mr-4 flex relative">
          <video
            className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[480px] w-auto rounded-3xl cursor-pointer bg-gray-100"
            src={post.video.asset.url}
            loop
            controls
          />
        </div>
      </Link>
    </div>
  )
}

export default VideoCard
