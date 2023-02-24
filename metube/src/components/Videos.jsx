import { Grid} from "@mui/material";
import React from "react";
import ChannelCard from "./ChannelCard";
import VideoCard from "./VideoCard";

const Videos = ({ videos}) => {
  // console.log(videos);
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
      {videos.map((item, idx) => (
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
      ))}
    </Grid>
  );
};

export default Videos;
