import { likePost } from '@/utils/client'
import { useSession } from 'next-auth/react'
import React, { useEffect, useMemo, useState } from 'react'
import { MdFavorite } from 'react-icons/md'

interface IProps {
  postId: string
  postLikes: any[]
}

const LikeButton = ({ postId, postLikes }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const [likes, setLikes] = useState(postLikes || [])
  const [likeCount, setLikeCount] = useState(0)
  const { data: session } = useSession()
  const { user: userProfile } = session || {}

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

  const toggleLike = async (like: boolean) => {
    if (userProfile) {
      setAlreadyLiked(like)
      setLikeCount((likeCount) => {
        if (like) {
          return likeCount + 1
        } else {
          return likeCount - 1
        }
      })
      const data = await likePost(like, userProfile._id, postId)
      setLikes(data.likes || [])
    }
  }

  return (
    <div className="flex gap-6 pl-6 mt-2">
      <div className="flex flex-row gap-2 justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-2.5 text-[#F51997]"
            onClick={() => toggleLike(false)}
          >
            <MdFavorite className="text-base md:text-lg" />
          </div>
        ) : (
          <div className="bg-primary rounded-full p-2 md:p-2.5" onClick={() => toggleLike(true)}>
            <MdFavorite className="text-base md:text-lg" />
          </div>
        )}
        {likeCount > 0 && (
          <p className="text-base text-gray-600">
            {alreadyLiked
              ? likeCount > 1
                ? `You and ${(likeCount - 1).toLocaleString()} Other`
                : 'You'
              : likeCount.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default LikeButton
