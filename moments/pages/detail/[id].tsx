import Comments from '@/components/Comments'
import LikeButton from '@/components/LikeButton'
import NoResults from '@/components/NoResults'
import { Video } from '@/types'
import { BASE_URL } from '@/utils'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { GoVerified } from 'react-icons/go'
import { MdErrorOutline, MdOutlineCancel } from 'react-icons/md'
import ReactPlayer from 'react-player/lazy'

interface IProps {
  postDetails: Video
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails)
  const router = useRouter()
  const { data: session } = useSession()
  const { user: userProfile } = session || {}

  if (!post) return <NoResults text="This post doesn't exist" icon={<MdErrorOutline />} />

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like: like,
      })
      setPost({ ...post, likes: data.likes })
    }
  }

  return (
    <div className="flex w-full h-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative w-full lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p
            className="cursor-pointer text-white hover:text-gray-200"
            onClick={() => router.back()}
          >
            <MdOutlineCancel className="text-[32px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh] flex items-center">
            <ReactPlayer width="100%" height="100%" url={post.video.asset.url} controls />
          </div>
        </div>
      </div>
      <div className="relative w-full lg:w-3/12 lg:min-w-[360px] flex flex-col">
        <div className="flex gap-1 p-2 cursor-progress font-semibold rounded mt-10">
          <div className="md:w-16 md:h-16 w-10 h-10 ml-3">
            <Link href="/">
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
            <Link href={`/detail/${post._id}`}>
              <div className="flex flex-col gap-1">
                <p className="flex gap-1 items-center md:text-base text-primary font-bold">
                  {post.postedBy.userName} {` `}
                  <GoVerified className="text-blue-400 text-base" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>

        <p className="px-6 text-base text-gray-600">{post.caption}</p>
        <div className="mt-4 px-6">
          {userProfile && <LikeButton handleLike={handleLike} likes={post.likes} />}
        </div>
        <Comments postId={post._id} />
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: {
      postDetails: data,
    },
  }
}

export default Detail
