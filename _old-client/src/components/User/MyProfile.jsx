import React, { useState, useEffect } from "react";
import ProfileHeader from "../Profile/ProfileHeader";
import { ButtonGroup, Button } from "@mui/material";
import { Container } from "@mui/system";
import ProfileListsGrid from "../Profile/ProfileListsGrid";
import NotificationsTable from "../Notifications/NotificationsTable";
import { getAllUserData } from "../../interfaces/userInterface";

export default function MyProfile(props) {
  //get the user id from the props
  let userId = props.userId;
  //set new states for the username, my posts, followers, following, page index, and page content
  let [username, setUsername] = useState("");
  let [myPosts, setMyPosts] = useState([]);
  let [followers, setFollowers] = useState([]);
  let [following, setFollowing] = useState([]);
  let [bio, setBio] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageContent, setPageContent] = useState(
    <ProfileListsGrid source="mine" />
  );

  //query for users username, lists, followers, following etc. in here
  useEffect(() => {
    let ignore = false;
    //gets and setts all user data
    getAllUserData(userId).then((data) => {
      if (!ignore) {
        //set username
        setUsername(data.displayName);
        //set followers, following, and my posts
        setFollowers(data.followersList);
        setFollowing(data.followingList);
        setMyPosts(data.myPostList);
        setBio(data.bio);
      }
    });
    return () => {
      ignore = true;
    };
  }, [userId]);

  const handlePageChange = (i) => {
    if (i === 0) {
      //set the page index and page content to the my lists grid
      setPageIndex(0);
      setPageContent(<ProfileListsGrid source="mine" />);
    } else if (i === 1) {
      //set the page index and page content to the saved lists grid
      setPageIndex(1);
      setPageContent(<ProfileListsGrid source="liked" />);
    } else if (i === 2) {
      //set the page index and page content to the notifications table
      setPageIndex(2);
      setPageContent(<NotificationsTable />);
    }
  };

  return (
    <>
      <ProfileHeader
        myProfile={true}
        username={username}
        posts={myPosts}
        followers={followers}
        following={following}
        bio={bio}
      />
      <Container>
        <ButtonGroup
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            mb: "20px",
          }}
        >
          <Button
            onClick={() => handlePageChange(0)}
            variant={pageIndex === 0 ? "contained" : "outlined"}
            sx={{ width: "30%" }}
          >
            My Lists
          </Button>
          <Button
            onClick={() => handlePageChange(1)}
            variant={pageIndex === 1 ? "contained" : "outlined"}
            sx={{ width: "30%" }}
          >
            Liked Lists
          </Button>
          <Button
            onClick={() => handlePageChange(2)}
            variant={pageIndex === 2 ? "contained" : "outlined"}
            sx={{ width: "30%" }}
          >
            Notifications
          </Button>
        </ButtonGroup>
        {pageContent}
      </Container>
    </>
  );
}
