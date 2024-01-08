import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";

export default function ViewPlaylistItem(props) {
  return (
    <Box>
      <Divider sx={{ my: "20px" }} />
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Box
          component="img"
          sx={{ width: "100px", aspectRatio: "1", mx: "40px" }}
          src={props.image}
        ></Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Link style={{ textDecoration: "none" }} to={`/song/${props.isrc}`}>
            <Typography variant="h5" color="primary.main">
              {props.title}
            </Typography>
          </Link>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h6" sx={{ mr: "10px" }}>
              by
            </Typography>
            <Link
              style={{ textDecoration: "none" }}
              to={`/artist/${props.artistId}`}
            >
              <Typography variant="h6" color="primary.main">
                {props.artist}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
