import { useTheme } from "@emotion/react";
import { CheckCircle } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";
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
  const [timePassed, setTimePassed] = useState("");
  useEffect(() => {
    const pastDate = new Date(snippet?.publishedAt);
    const now = new Date();
    const millisecondsPassed = now.getTime() - pastDate.getTime();
    const secondsPassed = Math.floor(millisecondsPassed / 1000);
    const minutesPassed = Math.floor(secondsPassed / 60);
    const hoursPassed = Math.floor(minutesPassed / 60);
    const daysPassed = Math.floor(hoursPassed / 24);
    const monthsPassed =
      (now.getFullYear() - pastDate.getFullYear()) * 12 +
      (now.getMonth() - pastDate.getMonth());
    const yearsPassed = now.getFullYear() - pastDate.getFullYear();

    if (minutesPassed < 60) {
      setTimePassed(`${minutesPassed} minutes ago`);
    } else if (hoursPassed < 25) {
      setTimePassed(`${hoursPassed} hours ago`);
    } else if (daysPassed < 32) {
      setTimePassed(`${daysPassed} days ago`);
    } else if (monthsPassed < 12) {
      setTimePassed(`${monthsPassed} months ago`);
    } else {
      setTimePassed(`${yearsPassed} years ago`);
    }
  }, [snippet]);

  return (
    <Card>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          component="img"
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title || "thumbnail"}
          sx={{ width: "100%", height: 180, borderRadius: 3 }}
        />
      </Link>
      <CardContent sx={{ height: "106px" }}>
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
      </CardContent>
    </Card>
  );
};

export default VideoCard;
