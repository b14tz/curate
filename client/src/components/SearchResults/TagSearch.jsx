import React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function TagSearch(props) {
  //get the name from the props
  const name = props.name;

  //const url = props.url;

  return (
    <Container
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <LocalOfferIcon sx={{ color: "primary.main", fontSize: "8rem" }} />
      <Box>
        <Link to="" style={{ textDecoration: "none" }}>
          <Typography
            color="primary.main"
            fontSize="2.5rem"
            sx={{ mb: "-10px" }}
          >
            {name}
          </Typography>
        </Link>
        <Typography color="primary.main" fontSize="1.5rem">
          Tag
        </Typography>
      </Box>
    </Container>
  );
}
