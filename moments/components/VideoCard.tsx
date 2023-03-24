import { Video } from '@/types'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { GoComment, GoVerified } from 'react-icons/go'
import {
  MdOutlineEdit,
  MdMoreHoriz,
  MdOutlineDeleteForever,
  MdErrorOutline,
  MdClose,
  MdFavorite,
  MdOutlineFavoriteBorder,
} from 'react-icons/md'
import { RiShareForwardLine } from 'react-icons/ri'
import Modal from 'react-modal'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { dateDiff, formatDate } from '@/utils/helpers'
import { useSession } from 'next-auth/react'
import { MAX_CONTENT } from '@/utils/config'
import { likePost } from '@/utils/client'

interface IProps {
  post: Video
  deletePost?: (id: string) => Promise<void>
}

const VideoCard: NextPage<IProps> = ({ post, deletePost }) => {
  const { data: session } = useSession()
  const { user: userProfile } = session || {}
  const [likes, setLikes] = useState(post.likes || [])
  const [likeCount, setLikeCount] = useState(likes.length)
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef(null)
  const isOnHome = deletePost && userProfile && userProfile._id === post.postedBy._id

  if (!post.content) {
    post.content = ''
  }

  const contentLength = post.content.split(' ').length
  const shouldTruncate = contentLength > MAX_CONTENT
  const truncatedContent = shouldTruncate
    ? post.content.slice(0, post.content.lastIndexOf(' ', MAX_CONTENT)) + '...'
    : post.content
  const publishedTime = useMemo(() => dateDiff(new Date(post._createdAt)), [post])
  // const formattedFullDate = useMemo(() => formatDate(new Date(post._createdAt)), [post])

  useEffect(() => {
    if (userProfile && likes) {
      const filterLikes = likes.filter((item) => item._ref === userProfile._id)
      if (filterLikes.length > 0) {
        setAlreadyLiked(true)
      } else {
        setAlreadyLiked(false)
      }
      setLikeCount(likes.length)
    }
  }, [likes, userProfile])

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      setAlreadyLiked(like)
      setLikeCount((likeCount) => {
        if (like) {
          return likeCount + 1
        } else {
          return likeCount - 1
        }
      })
      const data = await likePost(like, userProfile._id, post._id)
      setLikes(data.likes)
    }
  }

  function toggleModal() {
    setIsModalOpen((open) => !open)
    setIsOpen(false)
  }

  function hideModal() {
    setIsModalOpen(false)
  }

  function handleDelete() {
    // handle delete action
    if (deletePost) {
      deletePost(post._id)
    }
    setIsModalOpen(false)
  }

  function handleClick() {
    setIsOpen((open) => !open)
  }

  function handleClose() {
    setIsOpen(false)
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    let observerRefValue: Element | null = null
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
      observerRefValue = ref.current
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue)
      }
    }
  }, [ref])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <div ref={ref}>
      {isVisible && (
        <div className="flex flex-col gap-2 border-b-2 border-gray-200 pb-4">
          <div className="flex justify-between gap-3 p-2 rounded">
            <div className="flex gap-3 cursor-progress font-semibold rounded">
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
              <div className="flex flex-col justify-center items-start">
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
                <p className="text-sm text-gray-600 hover:underline capitalize">{publishedTime}</p>
              </div>
            </div>
            {isOnHome && (
              <div ref={menuRef} className="relative">
                <button className="rounded-full hover:bg-primary p-2" onClick={handleClick}>
                  <MdMoreHoriz className="text-2xl" />
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <Link href={`/update/${post._id}`}>
                      <div
                        className="px-4 py-2 flex flex-row items-center gap-4 text-gray-800 hover:bg-primary"
                        onClick={handleClose}
                      >
                        <MdOutlineEdit className="text-2xl" />
                        <p>Edit post</p>
                      </div>
                    </Link>
                    <div
                      className="px-4 py-2 flex flex-row items-center gap-4 cursor-pointer text-red-500 hover:bg-primary"
                      onClick={toggleModal}
                    >
                      <MdOutlineDeleteForever className="text-2xl" />
                      <p>Delete</p>
                    </div>
                  </div>
                )}
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={hideModal}
                  id="delete-modal"
                  className="fixed top-1/3 left-0 md:left-1/4 lg:left-1/3 p-4 overflow-x-hidden overflow-y-auto"
                >
                  <div className="relative w-full h-full max-w-md md:h-auto bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      onClick={hideModal}
                    >
                      <MdClose className="w-5 h-5" />
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                      <MdErrorOutline className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" />
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this post?
                      </h3>
                      <button
                        onClick={handleDelete}
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={hideModal}
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
            )}
          </div>

          <div className="px-2 rounded-lg relative">
            <div className="text-small md:text-base">
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
                className="font-medium cursor-pointer hover:underline text-sm"
                onClick={() => setShowMore((prev) => !prev)}
              >
                {showMore ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>

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

          {likeCount > 0 && (
            <div className="text-base text-gray-500 flex flex-row gap-1 items-center">
              <MdFavorite className="text-lg md:text-xl text-[#F51997]" />
              {alreadyLiked ? (
                likeCount > 1 ? (
                  <p>{'You and ' + (likeCount - 1).toLocaleString()} Other</p>
                ) : (
                  <p>You</p>
                )
              ) : (
                <p>{likeCount.toLocaleString()}</p>
              )}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 w-auto lg:w-[600px] border-t-2">
            <div
              className="flex flex-row items-center justify-center gap-2 py-2 rounded-lg cursor-pointer hover:bg-primary"
              onClick={() => handleLike(!alreadyLiked)}
            >
              {alreadyLiked ? (
                <MdFavorite className="text-lg md:text-xl text-[#F51997]" />
              ) : (
                <MdOutlineFavoriteBorder className="text-lg md:text-xl" />
              )}
              <p className="font-semibold text-gray-600">Like</p>
            </div>
            <Link href={`/detail/${post._id}`}>
              <div className="flex flex-row items-center justify-center gap-2 py-2 rounded-lg cursor-pointer hover:bg-primary">
                <GoComment className="text-lg md:text-xl" />
                <p className="font-semibold text-gray-600">Comment</p>
              </div>
            </Link>
            <div className="flex flex-row items-center justify-center gap-2 py-2 rounded-lg cursor-pointer hover:bg-primary">
              <RiShareForwardLine className="text-lg md:text-xl" />
              <p className="font-semibold text-gray-600">Share</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoCard
