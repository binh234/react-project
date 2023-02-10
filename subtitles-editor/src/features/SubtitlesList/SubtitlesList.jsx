import React from "react";

import { List } from "@material-ui/core";

import { useSelector } from "react-redux";
import { SUBTITLES } from "../../constants/subtitles";
import SubtitleCard from "./components/SubtitleCard";

import styles from "./SubtitleList.module.scss";


const SubtitlesList = () => {
  const currentSubtitle = useSelector((state) => state.subtitles.activeSubtitle);

  const onCardClickHandler = (nextTime) => {
    const player = document.getElementById("global-player");
    if (player) {
      player.currentTime = nextTime;
    }
  };
 
  return (
    <div className={styles.SubtitlesList}>
      <List>
        {SUBTITLES.map(({ text, startTime, endTime }) =>  (
          
          <SubtitleCard
            clickHandler={() => {
              onCardClickHandler(startTime);
            }}
       
            isActive={startTime === currentSubtitle.startTime}
            key={`${String(startTime)}-${String(endTime)}`}
            text={text}
            startTime={startTime}
            endTime={endTime}
          />
        ))}
      </List>
    </div>
  );
};

SubtitlesList.propTypes = {};

export default SubtitlesList;
