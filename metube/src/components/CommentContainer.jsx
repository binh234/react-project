import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { fetchFromRapidAPI } from '../utils/APIConfig';
import CommentFavorite from '../utils/CommentFavorite';
import CommentList from './CommentList';

const CommentContainer = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [nextToken, setNextToken] = useState("");
  const [pageToken, setPageToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sampleComments = [1, 2, 3, 4, 5];
  const loaderRef = useRef(null);
  const theme = useTheme();

  const getComments = async (override) => {
    if (!isLoading) {
      setIsLoading(true);
      fetchFromRapidAPI(`commentThreads?part=snippet&videoId=${videoId}&pageToken=${nextToken}`).then(
        (data) => {
          // console.log(data);
          setComments(comments => override ? data.items : [...comments, ...data.items]);
          setPageToken(data.nextPageToken);
        }
      );
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (nextToken !== "") {
      getComments(false);

    }
  }, [nextToken]);

  useEffect(() => {
    if (videoId) {
      getComments(true);
    }
  }, [videoId]);

  // Infinite loading
  useEffect(() => {
    let observerRefValue = null;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loaderRef && loaderRef.current) {
      observerRefValue = loaderRef.current;
      observer.observe(observerRefValue);
    }

    return () => {
      observer.unobserve(observerRefValue);
    };
  }, []);
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setNextToken(pageToken);
    }
  };

  return (
    <Box my={3}>
      {comments.length > 0 ? 
        <CommentList comments={comments} /> :
        sampleComments.map((_, i) => (
          <CommentFavorite key={i} 
          backgroundColor={theme.palette.action.hover}
          foregroundColor={theme.palette.action.selected}/>
        ))
      }
      
      <div ref={loaderRef} styles={{display: isLoading ? "none" : "block"}} />
    </Box>
  )
}

export default CommentContainer