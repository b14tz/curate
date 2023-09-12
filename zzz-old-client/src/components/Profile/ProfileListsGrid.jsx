import React, { useEffect, useState } from "react";
import { Typography, Divider, Container, Grid } from "@mui/material";
import ProfileListPreview from "./ProfileListPreview";
import {
  getAllUserPostData,
  getAllLikedPostData,
} from "../../interfaces/userInterface";
import { auth } from "../../config/firebase";

export default function ProfileListsGrid(props) {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    let ignore = false;
    if (props.source === "mine") {
      //get all the posts made by the user
      getAllUserPostData(auth.currentUser.uid).then((data) => {
        if (!ignore) {
          //set the post data to the data retrieved
          setPostData(data);
        }
      });
    } else if (props.source === "liked") {
      //get all the posts saved by the user
      getAllLikedPostData(auth.currentUser.uid).then((data) => {
        if (!ignore) {
          //set the post data to the data retrieved
          setPostData(data);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [props.source]);
  //render the posts
  const renderPosts = (othersList) => {
    return Object.keys(postData).map((key) => (
      <Grid item xs={8} key={key}>
        <ProfileListPreview
          othersLists={othersList}
          data={postData[key]}
          postId={key}
        />
      </Grid>
    ));
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      {props.source === "mine" ? (
        <Typography variant="header">My Lists</Typography>
      ) : (
        <Typography variant="header">Liked Lists</Typography>
      )}
      <Divider />
      <Grid container spacing={2} columns={16}>
        {renderPosts(props.source === "mine" ? false : true)}
      </Grid>
    </Container>
  );
}
