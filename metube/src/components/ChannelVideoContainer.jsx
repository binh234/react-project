import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useRef, useState } from 'react'
import { fetchFromRapidAPI } from '../utils/APIConfig';
import Videos from './Videos';
import { SaveAltOutlined } from '@mui/icons-material';

const ChannelVideoContainer = ({ channelId }) => {
  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState("");
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const getVideos = async (override) => {
    if (!isLoading) {
      setIsLoading(true);
      const data = await fetchFromRapidAPI(`search?part=snippet&channelId=${channelId}&pageToken=${nextToken}&order=date`);
      // await sleep(15000); // Lazy loading test
      setVideos((videos) => override ? data.items : [...videos, ...data.items]);
      setNextToken(data.nextPageToken);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page > 0) {
      console.log(page);
      getVideos(false);
    }
  }, [page]);

  useEffect(() => {
    if (channelId) {
      getVideos(true);
    }
  }, [channelId]);

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
      setPage((page) => page + 1);
    }
  };

  return (
    <Box m={5}>
      <Videos videos={videos} />
      {isLoading && <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveAltOutlined />}
        variant="text"
      >
        Loading..
      </LoadingButton>}
      <div ref={loaderRef} styles={{ display: isLoading ? "none" : "block" }} />
    </Box>
  )
}

export default ChannelVideoContainer