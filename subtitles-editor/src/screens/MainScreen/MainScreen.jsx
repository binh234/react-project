import React from "react";
import styles from "./MainScreen.module.scss";
import VideoSubtitlesPlayer from "../../features/VideoSubtitlesPlayer";
import SubtitlesList from "../../features/SubtitlesList/SubtitlesList";
// import PropTypes from 'prop-types';

export const MainScreen = () => (
  <div className={styles.MainScreen}>
    <VideoSubtitlesPlayer />
    <SubtitlesList />
  </div>
);

MainScreen.propTypes = {};
