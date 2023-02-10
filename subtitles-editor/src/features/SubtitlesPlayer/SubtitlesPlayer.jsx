import React, { useEffect, useState } from "react";

import IntervalTree from "@flatten-js/interval-tree";

import { useDispatch, useSelector } from "react-redux";
import { SUBTITLES } from "../../constants/subtitles";
import styles from "./SubtitlesPlayer.module.scss";
import { updateActiveSubtitle  } from "./subtitlesPlayerSlice";

export const SubtitlesPlayer = () => {
  const storeCurrentTime = useSelector((state) => state.player.currentTime);
  const currentSubtitle = useSelector((state) => state.subtitles.activeSubtitle);
  const dispatch = useDispatch();
  const [normalizedTree, setNormalizedTree] = useState(new IntervalTree());

  useEffect(() => {
    const tree = new IntervalTree();
    SUBTITLES.forEach((item) => {
      tree.insert([item.startTime, item.endTime], item);
    });
    setNormalizedTree(tree);
  }, []);

  useEffect(() => {
    const nextCurrentSubtitle = normalizedTree.search([
      storeCurrentTime,
      storeCurrentTime,
    ])[0];
    if (
      nextCurrentSubtitle &&
      nextCurrentSubtitle.text !== currentSubtitle?.text
    ) {

      dispatch(updateActiveSubtitle( {activeSubtitle: nextCurrentSubtitle}))
      
    } else if (!nextCurrentSubtitle?.text && currentSubtitle?.text) {
      dispatch(updateActiveSubtitle( {activeSubtitle: {}}))
    }
  }, [storeCurrentTime]);

  return (
    <div className={styles.SubtitlesWrapper}>
      {currentSubtitle.text && (
        <div className={styles.SubtitleItem}>{currentSubtitle.text}</div>
      )}
    </div>
  );
};

SubtitlesPlayer.propTypes = {};
