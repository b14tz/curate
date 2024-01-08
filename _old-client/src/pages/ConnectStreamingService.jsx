import * as React from "react";
import { Button, Typography, Box } from "@mui/material";
import { Spotify } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import ConnectAppleButton from "../components/Apple/ConnectAppleButton";

export default function ConnectStreamingService() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        margin: "auto",
        alignItems: "center",
      }}
    >
      <Typography variant="header">Connect a Streaming Service</Typography>
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

      <ConnectAppleButton />
    </Box>
  );
}
