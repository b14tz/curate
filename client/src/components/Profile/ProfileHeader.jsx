import { Container, Box, Button, Divider, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import {
  addFollow,
  removeFollow,
  getIsFollowing,
} from "../../interfaces/followInterface";
import { createNotification } from "../../interfaces/notificationsInterface";
import { getProfilePicture } from "../../interfaces/userInterface";

export default function ProfileHeader(props) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerAmount, setFollowerAmount] = useState(0);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    // load avatar
    if (props.myProfile) {
      getProfilePicture(auth.currentUser.uid).then((url) => {
        setProfilePicture(url);
      });
    } else {
      getProfilePicture(props.userId).then((url) => {
        setProfilePicture(url);
      });
    }
  }, [props]);

  let headerButton;
  //if the profile is the users own profile then show the edit profile button
  if (props.myProfile) {
    headerButton = (
      <Button
        href="/settings/profile"
        variant="contained"
        sx={{ width: "fit-content" }}
      >
        Edit Profile
      </Button>
    );
  } else {
    //see if the the current user is following the user or not
    if (isFollowing) {
      //if the profile is not the users own profile and they're following the user then show the unfollow button
      headerButton = (
        <Button
          onClick={handleUnfollow}
          variant="contained"
          sx={{ width: "fit-content" }}
        >
          Unfollow
        </Button>
      );
    } else {
      //if the profile is not the users own profile and they're not following the user then show the follow button
      headerButton = (
        <Button
          onClick={followUser}
          variant="contained"
          sx={{ width: "fit-content" }}
        >
          Follow
        </Button>
      );
    }
  }
  useEffect(() => {
    //check if the user is following the user
    getIsFollowing(auth.currentUser.uid, props.userId).then((bool) => {
      setIsFollowing(bool);
    });
    //get the number of followers the user has
    setFollowerAmount(props.followers.length);
  }, [props.userId, props.followers]);

  //get the current user id and the user id of the profile
  const userId = auth.currentUser.uid;
  const otherId = props.userId;

  // TODO: move functions to a follow interface?
  async function followUser(e) {
    e.preventDefault();

    //add the user to the current users following list
    await addFollow(userId, otherId);

    //check if the user is following the user already
    await getIsFollowing(userId, otherId).then((bool) => {
      setIsFollowing(bool);
    });

    //add the current user to the user's followers list if just followed
    setFollowerAmount(followerAmount + 1);
    createNotification(
      auth.currentUser.uid,
      props.userId,
      "follow",
      props.userId
    );
  }

  //a function to unfollow the user
  async function handleUnfollow(e) {
    e.preventDefault();
    //remove the user from the current users following list
    await removeFollow(userId, otherId);
    //check if the user is following the user already
    await getIsFollowing(userId, otherId).then((bool) => {
      setIsFollowing(bool);
    });
    //remove the current user from the user's followers list if just unfollowed
    setFollowerAmount(followerAmount - 1);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{ width: "80%", display: "flex", justifyContent: "space-between" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={profilePicture}
            color="primary"
            sx={{ width: 80, height: 80, mb: "-20px", mr: "10px" }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="header" fontSize={40}>
              {props.username}
            </Typography>
            {headerButton}
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: "2rem",
              mr: "2rem",
              textAlign: "center",
            }}
          >
            <Typography variant="h3" color="primary">
              {props.posts.length}
            </Typography>
            <Typography variant="h5" color="primary">
              Lists
            </Typography>
          </Box>

          <Divider orientation="vertical" />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: "2rem",
              mr: "2rem",
              textAlign: "center",
            }}
          >
            <Typography variant="h3" color="primary">
              {followerAmount}
            </Typography>
            <Typography variant="h5" color="primary">
              Followers
            </Typography>
          </Box>

          <Divider orientation="vertical" />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "2rem",
              textAlign: "center",
            }}
          >
            <Typography variant="h3" color="primary">
              {props.following.length}
            </Typography>
            <Typography variant="h5" color="primary">
              Following
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container sx={{ width: "80%" }}>
        <Typography variant="h5">{props.bio}</Typography>
      </Container>
    </Box>
  );
}
