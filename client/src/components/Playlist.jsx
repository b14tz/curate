import * as React from "react";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

export default function PageImage() {
  return (
    <div>
      <Container>
        <div className="playlist-together">
          <div className="playlist1">
            <Link style={{ textDecoration: "none" }} to="/playlist/1">
              Playlist Name
            </Link>
          </div>
          <Box>
            <div className="page-images">
              <AccountCircleIcon />
              <Link style={{ textDecoration: "none" }} to="/other-profile">
                User
              </Link>
              <FavoriteIcon /> 332
              <ModeCommentIcon /> 21
            </div>
          </Box>
          <Box>
            <div className="description">
              This is where the description goes. This is where the
              description...
            </div>
          </Box>
        </div>
      </Container>
    </div>
  );
}
