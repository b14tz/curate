import React from "react";
import { Typography, Box } from "@mui/material";

export default function ViewTitles(props) {
  let header = "";

  let subHeader = "";

  let listHeader = "";
  //if the type is a album set the headers accordingly
  if (props.type === "album") {
    header = "Album Name";
    subHeader = "2016, Artist";
    listHeader = "Tracklist";
  } //else if the type is a song set the headers accordingly
  else if (props.type === "song") {
    header = "Song Title";
    subHeader = "2016, Artist, Album";
    listHeader = "Popular Lists With This Song";
  } else {
    //else the type is a artist set the headers accordingly
    header = "Artist Name";
    listHeader = "Top Songs";
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="header" sx={{ fontSize: "4rem" }}>
        {header}
      </Typography>
      <Typography variant="h4" sx={{ mt: "-20px", mb: "-15px" }}>
        {subHeader}
      </Typography>
      <Typography variant="header">{listHeader}</Typography>
    </Box>
  );
}
