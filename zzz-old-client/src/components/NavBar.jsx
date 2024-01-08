import { React, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PlaylistDialog from "../dialogs/PostDialog";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Discover from "../pages/Discover.jsx";
import { auth } from "../config/firebase";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [post, setPost] = useState(false);
  const { currentUser } = useAuth();
  const { logout, setError } = useAuth();
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    const searchTerm = event.target.value;
    if (key === "Enter" && searchTerm.length !== 0) {
      navigate({
        pathname: "/search/" + searchTerm,
      });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    //navigate to the user's profile if clicked on profile
    navigate(`/user/${auth.currentUser.uid}`);
  };

  const handleNotifications = () => {
    setAnchorEl(null);
    //navigate to the user's notifications if clicked on notifications
    navigate("/settings/notifications");
  };

  //a function to handle the logout
  async function handleLogout() {
    try {
      setError("");
      setAnchorEl(null);
      await logout();
      localStorage.setItem("isLoggedIn", false); //set the user to logged out
      localStorage.setItem("spotifyToken", ""); //set the spotify token to empty
      localStorage.setItem("spotifyTimestamp", ""); //set the spotify timestamp to empty
      localStorage.setItem("spotifyId", ""); //set the spotify id to empty
      navigate("/login"); //navigate to the login page once logged out
    } catch {
      setError("Failed to logout");
    }
  }

  //a function to handle the login
  const handleLogin = () => {
    navigate("/login");
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "10px",
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "primary",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ mb: "40px", background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button
              id="curateButton"
              color="primary"
              href="/"
              sx={{
                textTransform: "none",
                fontSize: 24,
              }}
            >
              <Typography variant="header" color="primary">
                Curate
              </Typography>
            </Button>
          </Typography>

          {currentUser && (
            <div>
              <IconButton
                id="dropdownButton"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="primary"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem id="profileButton" onClick={handleProfile}>
                  Profile
                </MenuItem>
                <MenuItem
                  id="notificationsButton"
                  onClick={handleNotifications}
                >
                  Notifications
                </MenuItem>
                <MenuItem id="logoutButton" onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}

          {!currentUser && (
            <Button
              id="loginButton"
              color="primary"
              sx={{
                textTransform: "none",
                fontSize: 18,
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          )}

          <Button
            id="feedButton"
            color="primary"
            href="/feed"
            sx={{
              textTransform: "none",
              fontSize: 18,
              ml: "10px",
            }}
          >
            Feed
          </Button>
          <Button
            id="discoverButton"
            color="primary"
            href="/discover"
            sx={{
              textTransform: "none",
              fontSize: 18,
              mx: "10px",
            }}
            onClick={Discover}
          >
            Discover
          </Button>
          <Search tabIndex={1} onKeyDown={handleKeyDown}>
            <SearchIconWrapper>
              <SearchIcon color="primary" />
            </SearchIconWrapper>
            <StyledInputBase
              id="search-bar"
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {isLoggedIn ? (
            <IconButton
              onClick={() => setPost(true)}
              sx={{
                textTransform: "none",
                fontSize: 18,
                ml: "20px",
                borderRadius: "10px",
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.main",
                  opacity: 0.6,
                },
              }}
            >
              <AddIcon sx={{ color: "white" }} />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      {isLoggedIn ? (
        <PlaylistDialog trigger={post} setTrigger={setPost} />
      ) : null}
    </Box>
  );
}
