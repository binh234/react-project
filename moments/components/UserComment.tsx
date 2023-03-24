import { createDocument } from '@/utils/client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { MdSend } from 'react-icons/md'
import { SkewLoader } from 'react-spinners'

interface IProps {
  postId: string
}

const UserComment = ({ postId }: IProps) => {
  const [isPostingComment, setIsPostingComment] = useState(false)
  const commentRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()
  if (!session) {
    return <></>
  }
  const { user: userProfile } = session

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // addComment(commentRef.current!.value)
    if (userProfile) {
      setIsPostingComment(true)
      const text = commentRef.current!.value
      commentRef.current!.value = ''
      await createDocument({
        _type: 'comment',
        comment: text,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile._id,
        },
        post: {
          _type: 'post',
          _ref: postId,
        },
        userName: userProfile.name,
        image: userProfile.image,
      })
      setIsPostingComment(false)
    }
  }
  return (
    <div className="relative lg:absolute lg:bottom-0 lg:left-0 py-2 px-2 border-t-2 md:px-4 w-full">
      <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
        {userProfile.image && (
          <Image
            width={40}
            height={40}
            className="rounded-full h-10 hidden md:block"
            src={userProfile.image}
            alt={userProfile._id}
          />
        )}
        <input
          placeholder="Add comment"
          className="bg-primary px-4 py-2 text-base border-2 rounded-full w-full"
          ref={commentRef}
        />
        {isPostingComment ? (
          <SkewLoader color="fuchsia" size={10} aria-label="Comment Spinner" />
        ) : (
          <button className="text-lg text-gray-400 hidden md:block" type="submit">
            <MdSend />
          </button>
        )}
      </form>
    </div>
  )
}

export default UserComment
