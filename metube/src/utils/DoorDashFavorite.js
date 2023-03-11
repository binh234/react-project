import React from "react";
import ContentLoader from "react-content-loader";

const DoorDashFavorite = (props) => (
  <ContentLoader
    viewBox='0 0 1000 142'
    {...props}
  >
    <rect x='20' y='20' rx='3' ry='3' width='960' height='32' />
    <circle cx='48' cy='96' r='32' />
    <rect x='92' y='70' rx='3' ry='3' width='160' height='26' />
    <rect x='92' y='104' rx='3' ry='3' width='200' height='24' />
    <rect x='820' y='70' rx='3' ry='3' width='160' height='26' />
    <rect x='0' y='140' rx='0' ry='0' width='1000' height='1' />
  </ContentLoader>
);

DoorDashFavorite.metadata = {
  name: "Nic Bovee", // My name
  github: "ghettifish", // Github username
  description: "A simple favorite from the DoorDash local favorites.", // Little tagline
  filename: "DoorDashFavorite", // filename of your loader
};

export default DoorDashFavorite;
