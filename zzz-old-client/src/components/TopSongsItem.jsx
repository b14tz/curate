import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function TopSong() {
  let songTitle = "Song Name";
  let songLikes = "300";
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Link style={{ textDecoration: "none" }} to="/song/1">
        <Typography variant="h5" color="primary" sx={{ mr: "10px" }}>
          {songTitle}
        </Typography>
      </Link>

      <FavoriteIcon color="primary" sx={{ mr: "10px" }} />
      <Typography variant="h5" color="primary">
        {songLikes}
      </Typography>
    </Box>
  );
}
