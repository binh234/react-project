import { CheckCircle } from "@mui/icons-material";
import { Box, CardMedia, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { fetchFromRapidAPI } from "../utils/APIConfig";
import ReactMarkdown from "react-markdown";
import Videos from "./Videos";

const VideoDetail = () => {
  const theme = useTheme();
  console.log(theme);
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState({});
  const [channelDetail, setChannelDetail] = useState({});
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    fetchFromRapidAPI(`videos?part=snippet,statistics&id=${id}`).then(
      (data) => {
        setVideoDetail(data.items[0]);
      }
    );
    fetchFromRapidAPI(
      `search?part=snippet&relatedToVideoId=${id}&type=video`
    ).then((data) => {
      setRelatedVideos(data.items);
    });
  }, [id]);
  const {
    snippet: { title, channelId, channelTitle, description } = {},
    statistics: { viewCount, likeCount } = {},
  } = videoDetail;
  useEffect(() => {
    if (videoDetail?.snippet?.channelId) {
      fetchFromRapidAPI(
        `channels?part=statistics&id=${videoDetail?.snippet?.channelId}`
      ).then((data) => {
        setChannelDetail(data?.items[0] || {});
      });
    }
  }, [videoDetail]);

  return (
    <Box minHeight="95vh" ml={{ xs: 0, sm: 2, md: 5 }}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={3} width="100%" sx={{ top: "86px" }}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls
          />
          <Typography variant="h6" p={2}>
            {title}
          </Typography>
          <Stack direction="row" justifyContent="space-between" px={2}>
            <Link
              to={`/channel/${channelId}`}
              style={{ color: theme.palette.text.primary }}
            >
              <Stack direction="row" spacing={2}>
                <CardMedia
                  component="img"
                  image={channelDetail?.snippet?.thumbnails?.high?.url}
                  alt={channelDetail?.snippet?.title || "channel"}
                  sx={{
                    borderRadius: "50%",
                    height: "40px",
                    width: "40px",
                    mb: 2,
                  }}
                />
                <Stack direction="column">
                  <Typography variant="h6" fontWeight={600} fontSize="1rem">
                    {channelTitle}
                    <CheckCircle
                      sx={{ ml: "5px", fontSize: 16 }}
                      color="primary"
                    />
                  </Typography>
                  <Typography variant="subtitle2" sx={{ opacity: "0.7" }}>
                    {parseInt(
                      channelDetail?.statistics?.subscriberCount
                    ).toLocaleString()}{" "}
                    subscribers
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <Stack direction="row" spacing={2} sx={{ opacity: "0.7" }}>
              <Typography variant="body1">
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
              <Typography variant="body1">
                {parseInt(likeCount).toLocaleString()} likes
              </Typography>
            </Stack>
          </Stack>
          <ReactMarkdown>{description}</ReactMarkdown>
        </Box>
        <Box
          py={{ md: 1, xs: 5 }}
          flex={1}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={relatedVideos} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
