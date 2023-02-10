import React from "react";

import VideoPlayer from "../VideoPlayer";
import SubtitlesPlayer from "../SubtitlesPlayer";
import styles from "./VideoSubtitlesPlayer.module.scss";

export const VideoSubtitlesPlayer = () => (
  <div className={styles.VideoSubtitlesPlayerWrapper}>
    <VideoPlayer />
    <SubtitlesPlayer />
  </div>
);

VideoSubtitlesPlayer.propTypes = {};
