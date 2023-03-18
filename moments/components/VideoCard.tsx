import { IUser, Video } from '@/types'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { GoVerified } from 'react-icons/go'
import { PortableText } from '@portabletext/react'
import { MdDeleteForever, MdEdit, MdMoreHoriz } from 'react-icons/md'
import axios from 'axios'
import { BASE_URL } from '@/utils'
import useAuthStore from '@/store/authStore'
import { useRouter } from 'next/router'

interface IProps {
  post: Video
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const { userProfile }: any = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const router = useRouter()

  function handleClick() {
    setIsOpen((open) => !open)
  }

  function handleClose() {
    setIsOpen(false)
  }

  async function deletePost(id: string) {
    handleClose()
    await axios.delete(`${BASE_URL}/api/post/${id}`)
    router.reload()
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
        <div className="flex flex-col gap-2 border-b-2 border-gray-200 pb-6">
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
            {userProfile && userProfile?._id === post.postedBy._id && (
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
                        <MdEdit className="text-xl" />
                        <p>Edit post</p>
                      </div>
                    </Link>
                    <div
                      className="px-4 py-2 flex flex-row items-center gap-4 cursor-pointer text-gray-800 hover:bg-primary"
                      onClick={() => deletePost(post._id)}
                    >
                      <MdDeleteForever className="text-xl" />
                      <p>Delete</p>
                    </div>
                  </div>
                )}
              </div>
            )}
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
      )}
    </div>
  )
}

export default VideoCard
