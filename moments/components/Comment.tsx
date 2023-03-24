import { IComment } from '@/types'
import { dateDiffShort } from '@/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { BiCommentX } from 'react-icons/bi'
import { GoVerified } from 'react-icons/go'
import { MdSend } from 'react-icons/md'
import { SkewLoader } from 'react-spinners'
import NoResults from './NoResults'

interface IProps {
  commentDetail: IComment
}

const Comment = ({ commentDetail }: IProps) => {
  const { comment, postedBy, _createdAt } = commentDetail
  const publishedTime = useMemo(() => dateDiffShort(new Date(_createdAt), 'en'), [_createdAt])
  return (
    <div className="py-2 pr-4 items-center">
      <div className="flex gap-3 cursor-pointer font-semibold rounded">
        <Link href={`/profile/${postedBy._id}`}>
          <Image
            width={32}
            height={32}
            className="rounded-full"
            src={postedBy.image}
            alt={postedBy._id}
          />
        </Link>

        <div className="flex flex-col gap-1">
          <div className=" bg-[#F8F8F8] p-2 rounded-2xl">
            <Link href={`/profile/${postedBy._id}`}>
              <p className="flex gap-1 items-center text-sm font-bold text-primary">
                {postedBy.userName}
                <GoVerified className="text-blue-400 text-sm" />
              </p>
            </Link>
            <p className="text-base font-normal">{comment}</p>
          </div>
          <div className="flex flex-row gap-3 pl-2">
            <p className="text-xs font-bold">Like</p>
            <p className="text-xs font-bold">Reply</p>
            <p className="text-xs text-gray-500">{publishedTime}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
