import { React, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { Spotify } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { setSpotifyToken } from "../interfaces/spotifyInterface";
import { auth } from "../config/firebase";

export default function SpotifyAuthPage() {
  const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const redirect_url = process.env.REACT_APP_SPOTIFY_ENCODED_REDIRECT_URL;
  const response_type = "token";
  let connect_url =
    "https://accounts.spotify.com/authorize?client_id=" +
    client_id +
    "&response_type=" +
    response_type +
    "&redirect_uri=" +
    redirect_url +
    "&scope=playlist-modify-public";

  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      let token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      console.log("spotify token: ", token);
      //sets spotify information in db
      setSpotifyToken(auth.currentUser.uid, token);
      navigate("/");
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        width: "fit-content",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="header">Spotify Connection</Typography>
      <Button
        variant="contained"
        href={connect_url}
        sx={{
          height: "5rem",
          mb: "20px",
          width: "fit-content",
          textTransform: "none",
        }}
      >
        <Spotify size="40" />
        <Typography variant="h5" sx={{ ml: "20px" }}>
          Connect Account
        </Typography>
      </Button>
    </Box>
  );
}
