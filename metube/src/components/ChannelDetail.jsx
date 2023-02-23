import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromRapidAPI } from "../utils/APIConfig";
import ChannelCard from "./ChannelCard";
import Videos from "./Videos";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState({});
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromRapidAPI(`channels?part=snippet%2Cstatistics&id=${id}`).then(
      (data) => {
        setChannelDetail(data?.items[0]);
      }
    );
    fetchFromRapidAPI(`search?part=snippet&channelId=${id}&order=date`).then(
      (data) => {
        setVideos(data?.items);
      }
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          className="channel-box"
          style={{
            backgroundSize: "100% auto",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${channelDetail?.brandingSettings?.image?.bannerExternalUrl})`,
          }}
        />

        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box m={5}>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
