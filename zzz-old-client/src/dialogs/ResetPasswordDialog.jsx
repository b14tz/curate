import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  getAuth,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

function ResetPassword(props) {
  const [email, setEmail] = React.useState("");

  const handleResetPassword = (e) => {
    const auth = getAuth();
    e.preventDefault();
    handleClose();
    if (!email) {
      alert("Please enter a valid email address.");
      setEmail("");
      return;
    }
    try {
      fetchSignInMethodsForEmail(auth, email).then((signInMethods) => {
        console.log(email);
        if (signInMethods.length === 0) {
          alert("No user found with that email address.");
          setEmail("");
        } else {
          sendPasswordResetEmail(auth, email).then(() => {
            alert("Reset password email sent successfully.");
            setEmail("");
          });
        }
      });
    } catch (error) {
      alert(`Error sending reset password email: ${error.message}`);
    }
  };

  const handleClose = () => {
    props.setTrigger(false);
  };

  return props.trigger ? (
    <div>
      <Dialog open={props.trigger} onClose={handleClose}>
        <Box sx={{ display: "flex", flexDirection: "row", columnGap: 40 }}>
          <DialogTitle> Change Password </DialogTitle>
          <IconButton
            sx={{ aspectRatio: "1", borderRadius: "100px" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email and new password
            below.
          </DialogContentText>
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            defaultValue={props.defaultEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            id="confirmResetButton"
            variant="contained"
            onClick={handleResetPassword}
          >
            {" "}
            Reset{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : (
    ""
  );
}

export default ResetPassword;
