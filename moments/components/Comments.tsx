import useAuthStore from '@/store/authStore'
import {IComment} from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React, {useRef} from 'react'
import {BiCommentX} from 'react-icons/bi'
import {GoVerified} from 'react-icons/go'
import {MdSend} from 'react-icons/md'
import NoResults from './NoResults'

interface IProps {
  isPostingComment: boolean
  addComment: (comment: string) => Promise<void>
  comments: IComment[]
}

const Comments = ({comments, addComment, isPostingComment}: IProps) => {
  const {userProfile}: any = useAuthStore()
  const commentRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addComment(commentRef.current!.value)
    commentRef.current!.value = ''
  }

  return (
    <div className="border-t-2 border-gray-200 mt-4 pt-4 pl-6 pr-4 border-b-2 lg:pb-0 pb-100px">
      <div className="overflow-scroll lg:h-[400px]">
        {comments?.length ? (
          comments.map(({comment, _key, postedBy}, idx) => (
            <div key={_key} className="py-2 items-center">
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
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <NoResults text="No comments yet" icon={<BiCommentX />} />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-4 px-2 md:px-4 w-full">
          <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
            <Image
              width={40}
              height={40}
              className="rounded-full h-10"
              src={userProfile.image}
              alt={userProfile._id}
            />
            <input
              placeholder="Add comment"
              className="bg-primary px-4 py-2 text-base border-2 rounded-full w-full"
              ref={commentRef}
            />
            <button className="text-lg text-gray-400" disabled={isPostingComment}>
              <MdSend />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments
