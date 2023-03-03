import { Box, Card, CardContent, CardMedia, Grid, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromRapidAPI } from "../utils/APIConfig";
import { demoVideoUrl } from "../utils/constants";
import YoutubeFresh from "../utils/YoutubeFesh";
import VideoCard from "./VideoCard";
import Videos from "./Videos";

const PlaylistDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [playlistDetail, setplaylistDetail] = useState({});
  const [videos, setVideos] = useState([]);
  const videoItems = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    fetchFromRapidAPI(`playlists?id=${id}&part=snippet`).then(
      (data) => {
        setplaylistDetail(data?.items[0]);
      }
    );
    fetchFromRapidAPI(`playlistItems?part=snippet&playlistId=${id}`).then(
      (data) => {
        setVideos(data?.items);
      }
    );
  }, [id]);

  const { snippet } = playlistDetail;

  return (
    <Box minHeight="95vh" ml={{ xs: 0, sm: 2, md: 5 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Card display={{ xs: "flex", md: "block" }} className="playlist-banner" flex={1}>
          <CardMedia
            component='img'
            src={snippet?.thumbnails?.high?.url || demoVideoUrl}
            alt='thubmnail'
            sx={{ width: "100%", height: 180, borderRadius: 3 }}
          />
          <CardContent>
            <Typography variant="h5">{snippet?.title}</Typography>
            <Typography variant="body1">{snippet?.description}</Typography>
          </CardContent>
        </Card>
        <Box
          py={{ md: 1, xs: 5 }}
          flex={2}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} />
        </Box>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent='center'>
          {videos.length > 0
            ? videos.map((item, idx) => (
              <Grid
                item
                key={idx}
                minWidth={{ xs: 200, md: 235 }}
                flexGrow={1}
                maxWidth={{ xs: "100%", sm: "50%", md: "33.33%", lg: "25%" }}
              >
                {item.id.videoId && (
                  <VideoCard videoDetail={item} />
                )}
              </Grid>
            ))
            : videoItems.map((_, idx) => (
              <Grid
                item
                key={idx}
                xs={12}
              >
                {theme.palette.mode === "light" ? (
                  <YoutubeFresh />
                ) : (
                  <YoutubeFresh
                    backgroundColor={theme.palette.grey.A700}
                    foregroundColor={theme.palette.grey[500]}
                  />
                )}
              </Grid>
            ))}
        </Grid>

      </Stack>
    </Box>
  );
};

export default PlaylistDetail;
