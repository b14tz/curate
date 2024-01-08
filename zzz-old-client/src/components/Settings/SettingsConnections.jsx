import { React, useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { Spotify } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import {
  setSpotifyToken,
  getSpotifyToken,
} from "../../interfaces/spotifyInterface";
import ConnectAppleButton from "../Apple/ConnectAppleButton";

export default function SettingsConnections({ handleChildClick }) {
  //use navigate to navigate to the spotify auth page
  let navigate = useNavigate();
  //set a variable to hold the spotify token
  const [spToken, setSpToken] = useState("");

  useEffect(() => {
    let ignore = false;
    //if the user is on the connections page, set the active tab to connections(2)
    if (window.location.pathname === "/settings/connections") {
      handleChildClick(2);
    }
    //get the spotify token
    getSpotifyToken(auth.currentUser.uid).then((token) => {
      //if the token is not empty, set the token
      if (!ignore) {
        //set the token
        setSpToken(token);
      }
    });
    return () => {
      ignore = true;
    };
  }, [handleChildClick]);

  //function to disconnect spotify
  const disconnectSpotify = () => {
    //set the token to empty
    setSpotifyToken(auth.currentUser.uid, "");
    //set the token state to empty
    setSpToken("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {spToken === "" ? (
        <Button
          variant="contained"
          onClick={() => {
            navigate("/spotify-auth");
          }}
          sx={{
            height: "5rem",
            mb: "20px",
            width: "fit-content",
            textTransform: "none",
          }}
        >
          <Spotify size="40" />
          <Typography variant="h5" sx={{ ml: "20px" }}>
            Connect Spotify Account
          </Typography>
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={disconnectSpotify}
          sx={{
            height: "5rem",
            mb: "20px",
            width: "fit-content",
            textTransform: "none",
          }}
        >
          <Spotify size="40" />
          <Typography variant="h5" sx={{ ml: "20px" }}>
            Disconnect Spotify Account
          </Typography>
        </Button>
      )}

      <ConnectAppleButton />
    </Box>
  );
}
