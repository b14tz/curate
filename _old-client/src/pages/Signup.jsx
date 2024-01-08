import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { createSearchTerms } from "../interfaces/SearchInterface";
import { auth } from "../config/firebase";
import { setUsesSpotify } from "../interfaces/userInterface";

const MIN_LENGTH = 6;

export default function Signup() {
  const navigate = useNavigate();
  const { currentUser, register, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passError, setPassError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  // directs user to home if already authenticated
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    // alert when not matched
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (
      password.length === 0 ||
      confirmPassword.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      displayName.length === 0
    ) {
      console.log("fill out all fields");
      setError("Please fill out all fields");
      return navigate("/signup");
    }

    // register returns a promise so must wait for it to be settled
    try {
      setError("");
      setLoading(true);
      const { user } = await register(email, password);
      console.log(user.uid);
      const searchTerms = await createSearchTerms(displayName);
      // create user document in Firestore users collection
      await setDoc(doc(db, "users", user.uid), {
        type: "USER",
        firstName: firstName,
        lastName: lastName,
        email: email,
        displayName: displayName,
        searchTerms: searchTerms,
        usesSpotify: false,
        usesAmazon: false,
        followersList: [],
        followingList: [],
        myPostList: [],
        savedPostList: [],
        likedSongList: [],
        likedPostList: [],
        likeNotifications: true,
        commentNotifications: true,
        saveNotifications: true,
      });

      setUsesSpotify(auth.currentUser.uid, "false");
      localStorage.setItem("isLoggedIn", true);
      navigate("/connect-streaming-service");
    } catch (e) {
      console.log(e);
      setError("Failed to register");
    }

    // re-enable button
    setLoading(false);
  }

  // password validations
  useEffect(() => {
    if (password.length <= MIN_LENGTH) {
      setPassError("Must be more then 6 characters.");
    }
  }, [password]);

  useEffect(() => {
    if (password.length > MIN_LENGTH && passError) {
      setPassError("");
    }
  }, [password, passError]);

  useEffect(() => {
    if (confirmPassword !== password) {
      setConfirmError("Passwords must match!");
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (password === confirmPassword && confirmError) {
      setConfirmError("");
    }
  }, [password, confirmPassword, confirmError]);

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "50%",
        }}
        onSubmit={handleFormSubmit}
      >
        <h1
          className="heading"
          style={{ fontSize: 120, fontWeight: "bold", margin: "auto" }}
        >
          Curate
        </h1>
        <TextField
          id="username"
          sx={{ mb: "20px" }}
          label="Username"
          variant="outlined"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="firstName"
            sx={{ mb: "20px", width: "48%" }}
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="lastName"
            sx={{ mb: "20px", width: "48%" }}
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <TextField
          id="email"
          sx={{ mb: "20px" }}
          type="email"
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          sx={{ mb: "20px" }}
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={password.length <= MIN_LENGTH}
          helperText={passError}
        />
        <TextField
          id="confirmPassword"
          sx={{ mb: "20px" }}
          type="password"
          label="Password Confirmation"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPassword !== password}
          helperText={confirmError}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <a className="text" href="/login">
            Have an account? Login here
          </a>
          <Button
            id="signup"
            variant="contained"
            type="submit"
            disabled={loading}
            style={{
              margin: "10px",
              marginLeft: "250px",
            }}
          >
            Signup
          </Button>
        </div>
      </Box>
    </>
  );
}
