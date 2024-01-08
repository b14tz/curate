import * as React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import unknownUser from "./images/Blank_Profile.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import Box from "@mui/material/Box";

export default function PageImage() {
  return (
    <Box>
      <div className="page-image-heart">
        <img src={unknownUser} alt="Unknown User" />
        <div className="page-image-icons-heart">
          <br></br>
          <FavoriteIcon /> 332
        </div>

        <div className="steaming-service-icons-heart">
          <br></br>
          <br></br>
          <br></br>
          <Box>
            <IconButton color="#41286E" aria-label="youtube_button">
              <YouTubeIcon />
            </IconButton>
            <IconButton color="#41286E" aria-label="spotify_button">
              <PauseCircleFilledIcon />
            </IconButton>
          </Box>
        </div>
      </div>
    </Box>
  );
}
