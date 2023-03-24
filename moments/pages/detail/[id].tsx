import Comments from '@/components/Comments'
import LikeButton from '@/components/LikeButton'
import NoResults from '@/components/NoResults'
import { Video } from '@/types'
import { BASE_URL } from '@/utils'
import { MAX_DETAIL_CONTENT } from '@/utils/config'
import { dateDiff } from '@/utils/helpers'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { GoVerified } from 'react-icons/go'
import { MdErrorOutline, MdOutlineCancel } from 'react-icons/md'
import ReactPlayer from 'react-player/lazy'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import UserComment from '@/components/UserComment'

interface IProps {
  post: Video
}

const Detail = ({ post }: IProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const { user: userProfile } = session || {}
  const [showMore, setShowMore] = useState(false)
  const publishedTime = useMemo(() => dateDiff(new Date(post._createdAt), 'en'), [post])

  if (!post) return <NoResults text="This post doesn't exist" icon={<MdErrorOutline />} />

  if (!post.content) {
    post.content = ''
  }

  const contentLength = post.content.split(' ').length
  const shouldTruncate = contentLength > MAX_DETAIL_CONTENT
  const truncatedContent = shouldTruncate
    ? post.content.slice(0, post.content.lastIndexOf(' ', MAX_DETAIL_CONTENT)) + '...'
    : post.content

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
        <div className="flex gap-4 p-2 cursor-progress font-semibold rounded mt-4">
          <div className="md:w-12 md:h-12 w-10 h-10 ml-3">
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
                <p className="flex gap-1 items-center text-sm md:text-base text-primary font-bold">
                  {post.postedBy.userName} {` `}
                  <GoVerified className="text-blue-400 text-base" />
                </p>
                <p className="text-xs md:text-sm text-gray-600 hover:underline">{publishedTime}</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="pl-6 pr-4 rounded-lg relative">
          <div className="text-small md:text-base text-gray-800">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Map `a` to use blue foreground color.
                a: ({ node, ...props }) => (
                  <a {...props} className="text-blue-500 hover:underline" />
                ),
              }}
            >
              {showMore ? post.content : truncatedContent}
            </ReactMarkdown>
          </div>
          {shouldTruncate && (
            <button
              className="font-medium cursor-pointer hover:underline text-sm block lg:hidden"
              onClick={() => setShowMore((prev) => !prev)}
            >
              {showMore ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
        {userProfile && <LikeButton postId={post._id} postLikes={post.likes} />}
        <Comments postId={post._id} />
        <UserComment postId={post._id} />
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: {
      post: data,
    },
  }
}

export default Detail
