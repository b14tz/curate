import ResetPasswordDialog from "../dialogs/ResetPasswordDialog";
import { useState } from "react";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { getUsesSpotify } from "../interfaces/userInterface";

export default function Login() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, login, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // directs home if alreday authenticated
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();

    // login returns a promise so must wait for it to be settled
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      localStorage.setItem("isLoggedIn", true);

      const usesSpotify = async () => {
        let spotifyUse = await getUsesSpotify(auth.currentUser.uid);
        return spotifyUse;
      };

      if (usesSpotify()) {
        navigate("/spotify-auth");
      } else {
        navigate(`/user/${auth.currentUser.uid}`);
      }
    } catch (e) {
      setError("Failed to login");
    }

    // re-enable button
    setLoading(false);
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "50%",
        }}
      >
        <h1
          className="heading"
          style={{ fontSize: 120, fontWeight: "bold", margin: "auto" }}
        >
          Curate
        </h1>
        <TextField
          id="enter-email"
          sx={{ mb: "20px" }}
          type="email"
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={handleChange}
        />
        <TextField
          id="password"
          sx={{ mb: "20px" }}
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <a id="signupLink" className="text" href="/signup">
            Don"t have an account? Sign up here.
          </a>
          <Box>
            <Button
              id="resetPasswordButton"
              variant="contained"
              color="secondary"
              onClick={() => setOpen(true)}
            >
              {" "}
              Reset Password{" "}
            </Button>
            <ResetPasswordDialog
              trigger={open}
              setTrigger={setOpen}
              defaultEmail={email}
              onEmail={setEmail}
            />
            <Button
              // href="/my-profile"
              id="loginPost"
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ ml: "20px" }}
            >
              Login
            </Button>
          </Box>
        </div>
      </Box>
    </>
  );
}
