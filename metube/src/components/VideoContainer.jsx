import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useEffect, useRef, useState } from 'react'
import { fetchFromRapidAPI } from '../utils/APIConfig';
import Videos from './Videos';
import { SaveAltOutlined } from '@mui/icons-material';

const VideoContainer = ({ selectedCategory }) => {
  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState("");
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const getVideos = async (override) => {
    if (!isLoading) {
      setIsLoading(true);
      const data = await fetchFromRapidAPI(
        `search?part=snippet&q=${selectedCategory}&pageToken=${nextToken}`
      );
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
    console.log(page);
    getVideos(true);
  }, [selectedCategory]);

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
    <Box p={2} flex={2} sx={{ overflowY: "auto", height: "84vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        {selectedCategory} <span className="red-text">videos</span>
      </Typography>
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

export default VideoContainer