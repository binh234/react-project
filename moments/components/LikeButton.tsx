import useAuthStore from '@/store/authStore'
import { BASE_URL } from '@/utils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdFavorite } from 'react-icons/md'

interface IProps {
  handleLike: (like: boolean) => Promise<void>
  likes: any[]
}

const LikeButton = ({handleLike, likes}: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false)
  const { userProfile }: any = useAuthStore()
  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true)
    } else {
      setAlreadyLiked(false)
    }
  }, [filterLikes, likes])

  return (
    <div className='flex gap-6'>
      <div className='mt-4 flex flex-row gap-2 justify-center items-center cursor-pointer'>
        {alreadyLiked ? (
          <div className='bg-primary rounded-full p-2 md:p-3 text-[#F51997]' onClick={() => handleLike(false)}>
            <MdFavorite className='text-base md:text-lg' />
          </div>
        ) : (
          <div className='bg-primary rounded-full p-2 md:p-4' onClick={() => handleLike(true)}>
            <MdFavorite className='text-base md:text-lg' />
          </div>
        )}
        <p className='text-md font-semibold'>{likes?.length | 0}</p>
      </div>
    </div>
  )
}

export default LikeButton