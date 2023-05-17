import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import { getProfilePicture } from "../../interfaces/userInterface";

export default function UserSearch(props) {
  
  const [image, setImage] = useState("");

  //get the name from the props

  const name = props.name;

  const followers = props.followers;

  const url = props.url;

  useEffect( () => {
    const fetchData = async () => {
      let image = await getProfilePicture(url);
      setImage(image);
    };
    fetchData();
  }, [url]);

  return (
    <Container
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Avatar src={image} color="primary" sx={{ fontSize: "8rem", width: 93, height: 93, mr: 1, ml: 1}} />
      <Box>
        <Link to={"/user/" + url} style={{ textDecoration: "none" }}>
          <Typography
            color="primary.main"
            fontSize="2.5rem"
            sx={{ mb: "-10px" }}
          >
            {name}
          </Typography>
        </Link>
        <Typography color="primary.main" fontSize="1.5rem">
          {followers} followers
        </Typography>
      </Box>
    </Container>
  );
}
