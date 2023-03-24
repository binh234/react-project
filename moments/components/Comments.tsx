import { IComment } from '@/types'
import { BASE_URL } from '@/utils'
import { subscribe } from '@/utils/client'
import CommentFavorite from '@/utils/CommentFavorite'
import { MAX_COMMENT_RESULT, NUM_PLACEHOLDER } from '@/utils/config'
import { getCurrentDateTime } from '@/utils/helpers'
import { postCommentSubscriptionQuery, singleUserQuery } from '@/utils/queries'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiCommentX } from 'react-icons/bi'
import Comment from './Comment'
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
  const [firstLoad, setFirstLoad] = useState(true)
  const [showMore, setShowMore] = useState(false)
  const [comments, setComments] = useState<IComment[]>([])
  const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null)

  const getComments = async (first: boolean) => {
    if (!lastCreatedAt && !first) {
      return
    }
    const { data } = (await axios.get(`${BASE_URL}/api/comment/${postId}`, {
      params: { maxResults: MAX_COMMENT_RESULT, lastCreatedAt: lastCreatedAt },
    })) as { data: IComment[] }

    if (data.length > 0) {
      if (data.length <= MAX_COMMENT_RESULT) {
        setLastCreatedAt(null)
      } else {
        setLastCreatedAt(data[data.length - 1]._createdAt)
      }
    } else {
      setLastCreatedAt(null) // Reached the end
    }
    if (first) {
      setComments(data)
      setFirstLoad(false)
    } else {
      setComments((comments) => [...comments, ...data])
    }
    setShowMore(false)
  }

  useEffect(() => {
    if (postId) {
      setFirstLoad(true)
      getComments(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  useEffect(() => {
    if (showMore) {
      getComments(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMore])

  useEffect(() => {
    const subscription = commentSubscription(postId).subscribe(async (newRecords) => {
      const comment = newRecords.result
      if (comment) {
        const parseComment: IComment = {
          _id: comment._id,
          _createdAt: comment._createdAt,
          comment: comment.comment,
          postedBy: {
            _id: comment.postedBy._ref,
            userName: comment.userName,
            image: comment.image,
          },
        }
        setComments((comments) => [parseComment, ...comments])
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [postId])

  return (
    <div className="border-gray-200 mt-4 pl-6 border-t-2 mb-2 lg:mb-12 h-4/5 md:h-1/2 lg:flex-grow overflow-scroll">
      {firstLoad ? (
        [...Array(NUM_PLACEHOLDER)].map((_, i) => <CommentFavorite key={i} />)
      ) : comments?.length ? (
        comments.map((comment) => <Comment key={comment._id} commentDetail={comment} />)
      ) : (
        <NoResults text="No comments yet" icon={<BiCommentX />} />
      )}
      {lastCreatedAt && (
        <button
          className="text-sm font-semibold hover:underline"
          onClick={() => {
            setShowMore((more) => !more)
          }}
          disabled={showMore}
        >
          {showMore ? 'Loading...' : 'Show more'}
        </button>
      )}
    </div>
  )
}

export default Comments
