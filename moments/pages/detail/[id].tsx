import Comments from '@/components/Comments'
import LikeButton from '@/components/LikeButton'
import comment from '@/moments-backend/schemas/comment'
import useAuthStore from '@/store/authStore'
import {Video} from '@/types'
import {BASE_URL} from '@/utils'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {useState} from 'react'
import {GoVerified} from 'react-icons/go'
import {MdOutlineCancel} from 'react-icons/md'
import ReactPlayer from 'react-player/lazy'

interface IProps {
  postDetails: Video
}

const Detail = ({postDetails}: IProps) => {
  const [post, setPost] = useState(postDetails)
  const router = useRouter()
  const {userProfile}: any = useAuthStore()
  const [isPostingComment, setIsPostingComment] = useState(false)

  if (!post) return null

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const {data} = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like: like,
      })
      setPost({...post, likes: data.likes})
    }
  }

  const addComment = async (comment: string) => {
    if (userProfile && comment) {
      setIsPostingComment(true);
      const {data} = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment: comment,
      });

      setPost({...post, comments: data.comments});
      setIsPostingComment(false);
    }
  }

  return (
    <div className="flex w-full h-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-full lg:w-9/12 flex justify-center items-center bg-black">
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
      <div className="relative w-full lg:w-3/12 lg:min-w-[360px]">
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
                <p className="flex gap-1 items-center md:text-md text-primary font-bold">
                  {post.postedBy.userName} {` `}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>

        <p className="px-6 text-md text-gray-600">{post.caption}</p>
        <div className="mt-4 px-6">
          {userProfile && <LikeButton handleLike={handleLike} likes={post.likes} />}
        </div>
        <Comments
          comments={post.comments}
          addComment={addComment}
          isPostingComment={isPostingComment}
        />
      </div>
    </div>
  )
}

export const getServerSideProps = async ({params: {id}}: {params: {id: string}}) => {
  const {data} = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: {
      postDetails: data,
    },
  }
}

export default Detail