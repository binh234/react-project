import { Grid, useTheme } from "@mui/material";
import React from "react";
import YoutubeFresh from "../utils/YoutubeFesh";
import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";

const Videos = ({ videos }) => {
  // console.log(videos);
  let videoItems = [1, 2, 3, 4, 5, 6, 7, 8];
  const theme = useTheme();
  console.log(theme);
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
      {videos.length > 0 ? videos.map((item, idx) => (
        <Grid
          item
          key={idx}
          minWidth={{ xs: 200, md: 235 }}
          flexGrow={1}
          maxWidth={{ xs: "100%", sm: "50%", md: "33.33%", lg: "25%" }}
        >
          {item.id.videoId ? (
            <VideoCard videoDetail={item} />
          ) : (
            <ChannelCard channelDetail={item} />
          )}
        </Grid>
      )) :
        videoItems.map((_, idx) => (
          <Grid
            item
            key={idx}
            minWidth={{ xs: 200, md: 270 }}
            flexGrow={1}
            maxWidth={{ xs: "100%", sm: "50%", md: "33.33%", lg: "25%" }}
          >
            {theme.palette.mode === "light" ? <YoutubeFresh /> : <YoutubeFresh backgroundColor={theme.palette.grey.A700} foregroundColor={theme.palette.grey[500]} />}
          </Grid>
        ))
      }
    </Grid>
  );
};

export default Videos;
