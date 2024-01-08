import React, { useState, useEffect } from "react";
import { TextField, Box, Button } from "@mui/material";
import ResetPasswordDialog from "../../dialogs/ResetPasswordDialog";
import {
  setUsername,
  setFirstName,
  setLastName,
  setEmail,
  setBio,
  getAllUserData,
} from "../../interfaces/userInterface";
import { auth } from "../../config/firebase";

export default function SettingsProfile({ handleChildClick }) {
  const [passwordDialog, setPasswordDialog] = useState(false);
  const handleOpenPasswordDialog = () => setPasswordDialog(true);
  //state to hold the form data
  const [formState, setFormState] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });

  //if user is on the profile page, set the active tab to profile (4)
  useEffect(() => {
    if (window.location.pathname === "/settings/profile") {
      handleChildClick(0);
    }
    getAllUserData(auth.currentUser.uid).then((data) => {
      console.log(data);
      let temp = {
        username: data.displayName,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        bio: data.bio,
      };
      setFormState(temp);
    });
  }, [handleChildClick]);

  const handleFormInput = (e) => {
    // update the form state with the new value
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  const updateProfile = async () => {
    // seperate functions for easier modification/debugging in future
    const userId = auth.currentUser.uid;
    await setUsername(userId, formState.username);
    await setFirstName(userId, formState.firstName);
    await setLastName(userId, formState.lastName);
    await setEmail(userId, formState.email);
    await setBio(userId, formState.bio);

    alert("Profile Updated!");
    // refresh the page to show the updated profile
    window.location.reload();
  };

  return (
    <Box
      component="form"
      id="profileForm"
      sx={{ display: "flex", flexDirection: "column", maxWidth: "600px" }}
    >
      <TextField
        id="username"
        label="Username"
        variant="outlined"
        value={formState.username}
        sx={{ mb: "20px" }}
        onChange={handleFormInput}
      />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}
      >
        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          value={formState.firstName}
          sx={{ width: "48%" }}
          onChange={handleFormInput}
        />
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          value={formState.lastName}
          sx={{ width: "48%" }}
          onChange={handleFormInput}
        />
      </Box>
      <TextField
        id="email"
        label="Email Address"
        variant="outlined"
        value={formState.email}
        sx={{ mb: "20px" }}
        onChange={handleFormInput}
      />
      <TextField
        id="bio"
        label="Bio"
        variant="outlined"
        value={formState.bio}
        multiline
        rows={4}
        sx={{ mb: "20px" }}
        onChange={handleFormInput}
      />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenPasswordDialog}
        >
          Change Password
        </Button>
        <Button variant="contained" onClick={updateProfile}>
          Save Changes
        </Button>
      </Box>

      <ResetPasswordDialog
        trigger={passwordDialog}
        setTrigger={setPasswordDialog}
      />
      {/* <Dialog
                open={passwordDialog}
                keepMounted
                onClose={handleClosePasswordDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent sx={{display : "flex", flexDirection : "column"}}>
                    <TextField type="password" id="new-password" label="New Password" variant="outlined" sx={{width:"25rem", mt:"10px", mb:"20px"}}/>
                    <TextField type="password" id="confirm-new-password" label="Confirm New Password" variant="outlined"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePasswordDialog}>Cancel</Button>
                    <Button onClick={handleClosePasswordDialog}>Change</Button>
                </DialogActions>
            </Dialog> */}
    </Box>
  );
}
