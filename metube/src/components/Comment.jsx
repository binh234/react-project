import { ExpandLess, ExpandMore, ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { dateDiff } from '../utils/helpers';

const Comment = ({ data, replyCount, replies }) => {
  const [showReplies, setShowReplies] = useState(false);
  if (data === undefined) return;

  const toggleReplies = () => {
    console.log(replies);
    setShowReplies(!showReplies);
  };

  const {
    authorDisplayName,
    authorProfileImageUrl,
    textOriginal,
    likeCount,
    publishedAt,
  } = data;
  const avatarSize = replyCount === undefined ? 16 : 32;

  return (
    <Stack direction="row" spacing={2} mb={2}>
      <Avatar alt={authorDisplayName} src={authorProfileImageUrl} sx={{ width: avatarSize, height: avatarSize }} />
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant='body1' fontWeight="bold">{authorDisplayName}</Typography>
          <Typography variant='subtitle1'>{dateDiff(new Date(publishedAt))}</Typography>
        </Stack>
        <Typography>{textOriginal}</Typography>
        <Stack direction="row" alignItems="center">
          <IconButton aria-label="like">
            <ThumbUpOutlined />
          </IconButton>
          <Typography variant='subtitle1'>{parseInt(likeCount).toLocaleString()}</Typography>
          <IconButton aria-label="dislike">
            <ThumbDownOutlined />
          </IconButton>
          <Typography variant='subtitle2' fontWeight="bold">Reply</Typography>
        </Stack>
        {replyCount > 0 && (
          <Button
            color="primary"
            variant="text"
            onClick={toggleReplies}
            startIcon={showReplies ? <ExpandLess /> : <ExpandMore />}
            sx={{ borderRadius: 4, width: "max-content" }}
          >
            {replyCount} replies
          </Button>
        )}

        {showReplies && replies && (
          <Box pl={6}>
            {replies.map((comment) => (
              <Comment
                data={
                  comment.snippet.topLevelComment !== undefined
                    ? comment.snippet.topLevelComment.snippet
                    : comment.snippet
                }
                id={comment.id}
                key={comment.id} />))}
          </Box>
        )}
      </Stack>
    </Stack>
  )
}

export default Comment