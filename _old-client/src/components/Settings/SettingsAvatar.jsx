import { React, useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { auth } from "../../config/firebase";
import {
  getProfilePicture,
  setProfilePicture,
  deleteProfilePicture,
} from "../../interfaces/userInterface";

export default function SettingsAvatar({ handleChildClick }) {
  //create state for the avatar
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    // if we are on the avatar page, set the active child to settings (1)
    if (window.location.pathname === "/settings/avatar") {
      handleChildClick(1);
    }
  }, [handleChildClick]);

  // function to handle the user's avatar upload
  async function handleAvatarUpload(e) {
    // get the image
    const avatarImage = e.target.files[0];
    // upload the image via firebase
    await setProfilePicture(auth.currentUser.uid, avatarImage);
    // refresh avatar
    getAvatar();
  }

  async function getAvatar() {
    // get the avatar url
    const url = await getProfilePicture(auth.currentUser.uid);
    // if the url exists
    if (url) {
      // set the avatar
      setAvatar(url);
    }
  }

  // function to handle the user's avatar deletion
  async function handleDelete() {
    // delete the avatar
    await deleteProfilePicture(auth.currentUser.uid);
    // set the avatar to null
    setAvatar(null);
  }

  // need to grab image on page load
  getAvatar();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          borderRadius: "15px",
          outline: "2px solid black",
          padding: "1rem",
          width: "fit-content",
          mb: "20px",
        }}
      >
        {avatar ? (
          <img
            src={avatar}
            alt="avatar"
            style={{ width: "15rem", height: "15rem" }}
          />
        ) : (
          <AccountCircleIcon color="primary" sx={{ fontSize: "15rem" }} />
        )}
      </Box>

      <div
        id="avatarButtons"
        sx={{ display: "flex", flexDirection: "row", padding: "5rem" }}
      >
        <Button
          variant="contained"
          component="label"
          sx={{ width: "fit-content" }}
        >
          Update Photo
          <input
            id="avatarImageUpload"
            accept="image/*"
            type="file"
            onChange={handleAvatarUpload}
            hidden
          />
        </Button>

        <Button
          variant="contained"
          component="label"
          sx={{ width: "fit-content" }}
          onClick={handleDelete}
        >
          Delete Photo
        </Button>
      </div>
    </Box>
  );
}
