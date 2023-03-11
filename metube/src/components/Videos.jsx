import { Grid, useTheme } from "@mui/material";
import React from "react";
import YoutubeFresh from "../utils/YoutubeFesh";
import ChannelCard from "./ChannelCard";
import PlaylistCard from "./PlaylistCard";
import VideoCard from "./VideoCard";

const Videos = ({ videos }) => {
  // console.log(videos);
  let videoItems = [1, 2, 3, 4, 5, 6, 7, 8];
  const theme = useTheme();
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} justifyContent='center'>
      {videos.length > 0
        ? videos.map((item, idx) => (
          <Grid
            item
            key={idx}
            xs={12}
            sm={6}
            tb={4}
            md={3}
            lg={2}
            minWidth={220}
          // flexGrow={1}
          // maxWidth={{ xs: "100%", sm: "50%", md: "33.33%", lg: "25%" }}
          >
            {item.id.videoId ? (
              <VideoCard videoDetail={item} />
            ) : item.id.channelId ? (
              <ChannelCard channelDetail={item} />
            ) : (
              <PlaylistCard playlistDetail={item} />
            )}
          </Grid>
        ))
        : videoItems.map((_, idx) => (
          <Grid
            item
            key={idx}
            xs={12}
            sm={6}
            tb={4}
            md={3}
            lg={2}
            minWidth={220}
          // flexGrow={1}
          // maxWidth={{ xs: "100%", sm: "50%", md: "33.33%", lg: "25%" }}
          >
            <YoutubeFresh
              backgroundColor={theme.palette.action.hover}
              foregroundColor={theme.palette.action.selected}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default Videos;
