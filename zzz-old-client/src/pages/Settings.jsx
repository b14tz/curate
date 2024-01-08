import React, { useState } from "react";
import { ButtonGroup, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import SettingsAvatar from "../components/Settings/SettingsAvatar";
import SettingsConnections from "../components/Settings/SettingsConnections";
import SettingsNotifications from "../components/Settings/SettingsNotifications";
import SettingsProfile from "../components/Settings/SettingsProfile";
import "../styles/main.css";
import { Routes, Route, Link } from "react-router-dom";

export default function Settings() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const handleChildClick = (i) => {
    setActiveTabIndex(i);
  };

  return (
    <Container>
      <Typography variant="h3">Account Settings</Typography>
      <ButtonGroup
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "20px",
          mb: "20px",
        }}
      >
        <Button
          onClick={() => handleChildClick(0)}
          variant={activeTabIndex === 0 ? "contained" : "outlined"}
          sx={{ width: "25%" }}
        >
          <Link
            to="profile"
            style={{
              width: "100%",
              height: "100%",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Profile
          </Link>
        </Button>
        <Button
          onClick={() => handleChildClick(1)}
          variant={activeTabIndex === 1 ? "contained" : "outlined"}
          sx={{ width: "25%" }}
        >
          <Link
            to="avatar"
            style={{
              width: "100%",
              height: "100%",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Avatar
          </Link>
        </Button>
        <Button
          onClick={() => handleChildClick(2)}
          variant={activeTabIndex === 2 ? "contained" : "outlined"}
          sx={{ width: "25%" }}
        >
          <Link
            to="connections"
            style={{
              width: "100%",
              height: "100%",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Connections
          </Link>
        </Button>
        <Button
          onClick={() => handleChildClick(3)}
          variant={activeTabIndex === 3 ? "contained" : "outlined"}
          sx={{ width: "25%" }}
        >
          <Link
            to="notifications"
            style={{
              width: "100%",
              height: "100%",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Notifications
          </Link>
        </Button>
      </ButtonGroup>

      <Routes>
        <Route
          path="profile"
          element={<SettingsProfile handleChildClick={handleChildClick} />}
        />
        <Route
          path="avatar"
          element={<SettingsAvatar handleChildClick={handleChildClick} />}
        />
        <Route
          path="connections"
          element={<SettingsConnections handleChildClick={handleChildClick} />}
        />
        <Route
          path="notifications"
          element={
            <SettingsNotifications handleChildClick={handleChildClick} />
          }
        />
      </Routes>
    </Container>
  );
}
