import { Typography, Box } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";

export default function SongList() {
  let songName = "Song Name";
  let songTime = "2:30";
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Link style={{ textDecoration: "none" }} to="/song/1">
        <Typography variant="h5" color="primary" sx={{ mr: "20px" }}>
          {songName}
        </Typography>
      </Link>
      <Typography variant="h5" color="primary">
        {songTime}
      </Typography>
    </Box>
  );
}
