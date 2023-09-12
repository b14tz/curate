import { Button, Typography } from "@mui/material";
import { Apple } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import {
  isAuthorized,
  authorizeAppleMusic,
  unauthorizeAppleMusic,
} from "../../interfaces/appleInterface";

export default function ConnectAppleButton() {
  //set a variable to hold a boolean of if the user is connected to apple music
  const [isConnected, setIsConnected] = useState(false);

  //function to connect to apple music and authorize
  async function connectAppleMusic() {
    if (!isConnected) {
      await authorizeAppleMusic();
      setIsConnected(true);
    } else {
      await unauthorizeAppleMusic();
      setIsConnected(false);
    }
  }
  //function to check if the user is connected to apple music
  async function checkAppleMusicConnection() {
    const connected = await isAuthorized();
    setIsConnected(connected);
  }
  //useEffect to check if the user is connected to apple music
  useEffect(() => {
    checkAppleMusicConnection();
  }, [isConnected]);

  return (
    <Button
      variant="contained"
      onClick={connectAppleMusic}
      sx={{
        height: "5rem",
        mb: "20px",
        width: "fit-content",
        textTransform: "none",
      }}
    >
      <Apple size="40" />
      <Typography variant="h5" sx={{ ml: "20px" }}>
        {/* will display different things if connected to apple music or not */}
        {isConnected ? "Disconnect Apple Music" : "Connect Apple Music"}
      </Typography>
    </Button>
  );
}
