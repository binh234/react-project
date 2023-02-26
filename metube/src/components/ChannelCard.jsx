import { CheckCircle } from "@mui/icons-material";
import { CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({
  channelDetail: {
    id,
    snippet,
    statistics,
  },
  marginTop
}) => {
  const theme = useTheme();
  const channelId = (typeof id === "string" ? id : id?.channelId);
    return (
    <Box sx={{ boxShadow: "none", borderRadius: 3, marginTop }}>
      <Link to={channelId ? `/channel/${channelId}` : "/"} style={{ color: theme.palette.text.primary }}>
        <CardContent className="channel-card">
          <CardMedia
            component="img"
            image={snippet?.thumbnails?.high?.url || demoProfilePicture}
            alt={snippet?.title || "channel"}
            sx={{ borderRadius: "50%", height: "180px", width: "180px", mb: 2 }}
          />
          <Typography variant="body2" fontWeight="bold">
            {snippet?.title}
            <CheckCircle sx={{ ml: "5px", fontSize: 18 }} color="primary" />
          </Typography>
          {statistics?.subscriberCount && (
            <Typography variant="subtitle2">
              {parseInt(statistics?.subscriberCount).toLocaleString()}{" "}
              Subscribers
            </Typography>
          )}
          {snippet?.description && (
            <Typography variant="subtitle" textAlign="left">
              {snippet.description.slice(0, 100) + "..."}
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
