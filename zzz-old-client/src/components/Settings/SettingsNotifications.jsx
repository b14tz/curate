import React, { useEffect, useState } from "react";
import { FormGroup, FormControlLabel, Switch, Typography } from "@mui/material";
import {
  setLikeNotifications,
  setCommentNotifications,
  getAllUserData,
} from "../../interfaces/userInterface";
import { auth } from "../../config/firebase";
//import { sendLikeEmail, sendCommentEmail, sendSaveEmail } from "../../interfaces/emailInterface";

export default function SettingsNotifications({ handleChildClick }) {
  const [likeChecked, setLikeChecked] = useState(false);
  const [commentChecked, setCommentChecked] = useState(false);

  useEffect(() => {
    getAllUserData(auth.currentUser.uid).then((data) => {
      setLikeChecked(data.likeNotifications);
      setCommentChecked(data.commentNotifications);
    });
    //if the user is on the settings page, set the active tab to notifications (3)
    if (window.location.pathname === "/settings/notifications") {
      handleChildClick(3);
    }
  }, [handleChildClick]);

  const handleLikeChange = async (event) => {
    setLikeChecked(event.target.checked);
    //if user has turned on like notifications
    const userId = auth.currentUser.uid;
    if (event.target.checked) {
      await setLikeNotifications(userId, true);
    } else {
      await setLikeNotifications(userId, false);
    }
  };

  const handleCommentChange = (event) => {
    setCommentChecked(event.target.checked);
    //if user has turned on comment notifications
    const userId = auth.currentUser.uid;
    if (event.target.checked) {
      setCommentNotifications(userId, true);
      //sendCommentEmail('kianaerickson', 'kiana-erickson@uiowa.edu', 'MYPLAYLIST', 'this is such an awesome playlist!')
    } else {
      setCommentNotifications(userId, false);
    }
  };

  return (
    <>
      <Typography variant="h5">Email</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={likeChecked} onChange={handleLikeChange} />}
          label="Allow emails to be sent when your playlists receive likes"
        />
        <FormControlLabel
          control={
            <Switch checked={commentChecked} onChange={handleCommentChange} />
          }
          label="Allow emails to be sent when your playlists receive comments"
        />
      </FormGroup>
    </>
  );
}
