import { React, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  CircularProgress,
  Box,
  DialogContentText,
} from "@mui/material";
import { Spotify, Apple } from "react-bootstrap-icons";
import { createSpotifyPlaylist } from "../interfaces/spotifyInterface";
import { setDownloads } from "../interfaces/userInterface";
import { createAppleMusicPlaylistFromISRCs } from "../interfaces/appleInterface";
// import { sendSaveEmail } from '../interfaces/emailInterface';

export default function DownloadDialog(props) {
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [library, setLibrary] = useState("");

  const handleClose = () => {
    props.setDialog(false);
    setEnd(false);
    setLibrary("");
  };

  const handleCreateSpotifyPlaylist = async () => {
    setLibrary("Spotify");
    setLoading(true);
    await createSpotifyPlaylist(
      props.spotifyId,
      props.isrcList,
      props.spToken,
      props.title,
      props.description
    );
    setEnd(true);
    setLoading(false);
    setDownloads(props.postId, props.saves + 1);
    props.setSaves(props.saves + 1);
    //save playlist email
    //need a way to get the user's email that we're sending it to
    //sendSaveEmail(props.username, props.email, props.title);
  };

  const handleCreateApplePlaylist = async () => {
    setLibrary("Apple");
    setLoading(true);
    await createAppleMusicPlaylistFromISRCs(
      props.isrcList,
      props.title,
      props.description
    );
    setEnd(true);
    setLoading(false);
    //save playlist email
    //need a way to get the user's email that we're sending it to
    //sendSaveEmail(props.username, props.email, props.title);
  };

  return props.dialog ? (
    <div>
      <Dialog
        open={props.dialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Save to Library</DialogTitle>
        {loading ? (
          <Box sx={{ display: "flex", margin: "auto", pb: "20px" }}>
            <CircularProgress />
          </Box>
        ) : (
          <div>
            {end ? (
              <DialogContent>
                <DialogContentText>
                  {props.title} has been successfully added to your {library}{" "}
                  library
                </DialogContentText>
              </DialogContent>
            ) : (
              <DialogContent>
                {props.spotifyId === "" ? null : (
                  <Button
                    variant="contained"
                    onClick={() => handleCreateSpotifyPlaylist()}
                    sx={{
                      height: "5rem",
                      mb: "20px",
                      width: "fit-content",
                      textTransform: "none",
                    }}
                  >
                    <Spotify size="40" />
                    <Typography variant="h5" sx={{ ml: "20px" }}>
                      Add To Spotify Library
                    </Typography>
                  </Button>
                )}
                {props.appleId === "" ? null : (
                  <Button
                    variant="contained"
                    onClick={() => handleCreateApplePlaylist()}
                    sx={{
                      height: "5rem",
                      mb: "20px",
                      width: "fit-content",
                      textTransform: "none",
                    }}
                  >
                    <Apple size="40" />
                    <Typography variant="h5" sx={{ ml: "20px" }}>
                      Add To Apple Library
                    </Typography>
                  </Button>
                )}
              </DialogContent>
            )}
          </div>
        )}
      </Dialog>
    </div>
  ) : null;
}
