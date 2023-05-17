import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Divider,
  Stack,
  IconButton,
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function PlaylistSave(props) {
  const [platform, setPlatform] = React.useState("");

  const handleChange = (event, newPlatform) => {
    if (newPlatform !== null) {
      setPlatform(newPlatform);
    }
  };

  const handleClose = () => {
    props.setTrigger(false);
  };

  const handleSave = () => {
    props.setTrigger(false);
  };

  return props.trigger ? (
    <Box>
      <Dialog open={props.trigger} onClose={handleClose}>
        <Box sx={{ display: "flex", flexDirection: "row", columnGap: 25 }}>
          <DialogTitle> Save to Library </DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          <Stack spacing={2}>
            <DialogContentText> Copy Playlist to {platform}</DialogContentText>
            <ToggleButtonGroup
              color="secondary"
              value={platform}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="Spotify">Spotify</ToggleButton>
              <ToggleButton value="YouTube">YouTube</ToggleButton>
              <ToggleButton value="Apple Music">Apple Music</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            {" "}
            No{" "}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSave}>
            {" "}
            Yes{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  ) : (
    ""
  );
}

export default PlaylistSave;
