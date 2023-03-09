import { Box } from '@mui/material';
import React from 'react'
import Comment from './Comment';

const CommentList = ({ comments }) => {
  if (comments === undefined) return;

  return (
    <>
      {comments.map((comment, idx) => (
        <Box key={idx}>
          <Comment
            data={
              comment.snippet.topLevelComment !== undefined
                ? comment.snippet.topLevelComment.snippet
                : comment.snippet
            }
            replyCount={comment?.snippet?.totalReplyCount}
            replies={comment?.replies?.comments}
            id={comment.id} />
        </Box>
      ))}
    </>
  )
}

export default CommentList