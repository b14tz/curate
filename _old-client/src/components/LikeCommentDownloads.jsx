import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import DownloadIcon from "@mui/icons-material/Download";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import PlaylistSave from "./PlaylistSave";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E3EBFF",
    },
    secondary: {
      main: "#41286E",
    },
  },
});

export default function LikeCommentDownloads() {
  const [save, setSave] = useState(false);

  return (
    <div>
      <div className="like-comment-downloads">
        <FavoriteIcon />
        &nbsp; 332 &nbsp;
        <ModeCommentIcon />
        &nbsp; 21 &nbsp;
        <DownloadIcon />
        &nbsp; 10 &nbsp;
      </div>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setSave(true)}
        >
          Save To Library
        </Button>
        <PlaylistSave trigger={save} setTrigger={setSave} />
      </ThemeProvider>
      <div className="user">
        <AccountCircleIcon />
        &nbsp;
        <Link style={{ textDecoration: "none" }} to="/other-profile">
          User
        </Link>
      </div>
    </div>
  );
}
