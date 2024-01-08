import React from "react";
import { Typography, Container, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ArtistSearch(props) {
  //get the name from the props
  const name = props.name;
  //get the url from the props
  const url = props.url;
  //get the artistId from the props
  const artistId = props.artistId;

  let urlOption;
  //if the url is null then set the urlOption to the default account circle icon
  if (url === null) {
    urlOption = (
      <AccountCircleIcon
        color="primary"
        sx={{ fontSize: "8rem", width: 110, height: 110 }}
      />
    );
  } else {
    //else set the urlOption to the avatar with the url
    urlOption = (
      <Avatar
        color="primary"
        src={url}
        sx={{ fontSize: "8rem", width: 93, height: 93, mr: 1, ml: 1 }}
      />
    );
  }

  return (
    <Container
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      {urlOption}
      <Box>
        <Link to={"/artist/" + artistId} style={{ textDecoration: "none" }}>
          <Typography
            color="primary.main"
            fontSize="2.5rem"
            sx={{ mb: "-10px" }}
          >
            {name}
          </Typography>
        </Link>
        <Typography color="primary.main" fontSize="1.5rem">
          Artist
        </Typography>
      </Box>
    </Container>
  );
}
