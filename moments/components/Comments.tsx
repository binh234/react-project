import { IComment } from '@/types'
import { BASE_URL } from '@/utils'
import { client, createDocument, subscribe } from '@/utils/client'
import { COMMENT_MAX_RESULT } from '@/utils/config'
import { getCurrentDateTime } from '@/utils/helpers'
import { postCommentSubscriptionQuery, singleUserQuery } from '@/utils/queries'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { BiCommentX } from 'react-icons/bi'
import { GoVerified } from 'react-icons/go'
import { MdSend } from 'react-icons/md'
import NoResults from './NoResults'

interface IProps {
  postId: string
}

const commentSubscription = (postId: string) => {
  const currentTime = getCurrentDateTime()
  const query = postCommentSubscriptionQuery(postId, currentTime)
  return subscribe(query)
}

const Comments = ({ postId }: IProps) => {
  const { data: session } = useSession()
  const { user: userProfile } = session || {}
  const [isPostingComment, setIsPostingComment] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [comments, setComments] = useState<IComment[]>([])
  const commentRef = useRef<HTMLInputElement>(null)
  const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null)
  const userCache = new Map<string, any>()

  const getComments = async (first: boolean) => {
    if (!lastCreatedAt && !first) {
      return []
    }
    const { data } = await axios.get(`${BASE_URL}/api/comment/${postId}`, {
      params: { maxResults: COMMENT_MAX_RESULT, lastCreatedAt: lastCreatedAt },
    }) as {data: IComment[]}

    if (data.length > 0) {
      if (data.length <= COMMENT_MAX_RESULT) {
        setLastCreatedAt(null)
      } else {
        setLastCreatedAt(data[data.length - 1]._createdAt)
      }
      for (let comment of data) {
        userCache.set(comment.postedBy._id, {
          image: comment.postedBy.image,
          userName: comment.postedBy.userName,
        })
      }
    } else {
      setLastCreatedAt(null) // Reached the end
    }
    if (first) {
      setComments(data)
    } else {
      setComments((comments) => [...comments, ...data])
    }
    setShowMore(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // addComment(commentRef.current!.value)
    if (userProfile) {
      createDocument({
        _type: 'comment',
        comment: commentRef.current!.value,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile._id,
        },
        post: {
          _type: 'post',
          _ref: postId,
        },
      })
    }
    commentRef.current!.value = ''
  }

  useEffect(() => {
    if (postId) {
      getComments(true)
    }
  }, [postId])

  useEffect(() => {
    if (showMore) {
      getComments(false)
    }
  }, [showMore])

  useEffect(() => {
    const subscription = commentSubscription(postId).subscribe(async (newRecords) => {
      const comment = newRecords.result
      console.log(comment)
      if (comment) {
        const postedBy = comment.postedBy
        let user
        if (userCache.has(postedBy._ref)) {
          user = userCache.get(postedBy._ref)
        } else {
          user = await client.fetch(singleUserQuery(postedBy._ref))
        }
        const parseComment: IComment = {
          _id: comment._id,
          _createdAt: comment._createdAt,
          comment: comment.comment,
          postedBy : {
            _id: postedBy._ref,
            userName: user?.userName,
            image: user?.image
          }
        }
        setComments(comments => [parseComment, ...comments])
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [postId])

  return (
    <div className="border-gray-200 mt-4 pt-4 pl-6 border-t-2 lg:pb-0 pb-100px lg:flex-grow mb-14">
      <div className="overflow-scroll h-[400px] md:h-[450px]">
        {comments?.length ? (
          comments.map(({ comment, _id, postedBy }) => (
            <div key={_id} className="py-2 pr-4 items-center">
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
        {lastCreatedAt && (
          <button
            className="text-sm font-semibold hover:underline"
            onClick={() => {
              setShowMore((more) => !more)
            }}
          >
            {showMore ? 'Loading...' : 'Show more'}
          </button>
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 py-2 px-2 border-t-2 md:px-4 w-full">
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
            <button
              className="text-lg text-gray-400 hidden md:block"
              type="submit"
              disabled={isPostingComment}
            >
              <MdSend />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments
