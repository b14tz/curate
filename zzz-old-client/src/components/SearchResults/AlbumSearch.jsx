import React from "react";
import { Typography, Container } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export default function AlbumSearch(props) {
  //get the name from the props
  const name = props.name;
  //get the artist from the props
  const artist = props.artist;
  //get the url from the props
  const url = props.url;
  //get the spotifyID from the props
  const spotifyID = props.spotifyID;

  return (
    <Container
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Box
        component="img"
        src={url}
        sx={{ width: 110, height: 110, backgroundColor: "primary.main" }}
      ></Box>
      <Box sx={{ ml: "10px" }}>
        <Link to={"/album/" + spotifyID} style={{ textDecoration: "none" }}>
          <Typography
            color="primary.main"
            fontSize="2.5rem"
            sx={{ mb: "-10px" }}
          >
            {name}
          </Typography>
        </Link>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            color="primary.main"
            fontSize="1.5rem"
            sx={{ mr: "10px" }}
          >
            by
          </Typography>
          <Link to="/artist/1" style={{ textDecoration: "none" }}>
            <Typography color="primary.main" fontSize="1.5rem">
              {artist}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
