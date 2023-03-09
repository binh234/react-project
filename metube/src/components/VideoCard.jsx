import { useTheme } from "@emotion/react";
import { CheckCircle } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";
import { dateDiff } from "../utils/helpers";
// import { fetchFromRapidAPI } from "../utils/APIConfig";

const VideoCard = ({
  videoDetail: {
    id: { videoId },
    snippet,
  },
}) => {

  // console.log(snippet);
  // const [statistics, setStatistics] = useState({});
  // const [contentDetails, setContentDetails] = useState({});
  // useEffect(() => {
  //   fetchFromRapidAPI(`search?part=contentDetails%2Cstatistics&id=${videoId}`)
  //   .then((data) => {
  //     setContentDetails(data?.items[0].contentDetails);
  //     setStatistics(data?.items[0].statistics);
  //   })
  // }, [videoId])

  const theme = useTheme();

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let observerRefValue = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
      observerRefValue = ref.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [ref]);

  const timePassed = useMemo(() => dateDiff(new Date(snippet?.publishedAt)), [snippet]);

  return (
    <Card ref={ref}>
      {isVisible  && <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          component="img"
          image={ snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title || "thumbnail"}
          sx={{ width: "100%", height: 180, borderRadius: 3 }}
        />
      </Link>}
      {isVisible  && <CardContent sx={{ height: "106px" }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl} style={{ color: theme.palette.text.primary }}>
          <Typography variant="body2" fontWeight="bold">
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
          style={{ color: theme.palette.text.primary }}
        >
          <Typography
            variant="subtitle2"
            fontWeight={300}
            sx={{ opacity: "0.8" }}
          >
            {snippet?.channelTitle.slice(0, 60) ||
              demoChannelTitle.slice(0, 60)}
            <CheckCircle sx={{ ml: "5px", fontSize: 14 }} color="primary" />
          </Typography>
        </Link>
        <Stack direction="row" spacing={1} sx={{ opacity: "0.7" }}>
          {/* <Typography variant="caption">{statistics?.viewCount} views</Typography> */}
          {/* {"•"} */}
          <Typography variant="caption">{timePassed}</Typography>
        </Stack>
      </CardContent>}
    </Card>
  );
};

export default VideoCard;
