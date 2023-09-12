import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  getAllLikesOfObject,
  addLikeOfObject,
  removeLikeOfObject,
  getIsLiked,
} from "../../interfaces/likeInterface";
import { auth } from "../../config/firebase";
import { createNotification } from "../../interfaces/notificationsInterface";

export default function ViewArtAndLinks(props) {
  //set state for the number of likes and if the current user has liked the post
  const [likeCount, setLikeCount] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    let ignore = false;
    //if the type is a song, get the number of likes and if the current user has liked the song
    if (props.type === "song") {
      getAllLikesOfObject(props.songId, "song").then((data) => {
        if (!ignore) {
          console.log("data on likes: ", data);
          //set the number of likes
          setLikeCount(Object.keys(data).length);
          //check if the current user has liked the song
          getIsLiked(props.songId, "song", auth.currentUser.uid).then(
            (bool) => {
              console.log("this song was already liked by me: ", bool);
              setIsLiked(bool);
            }
          );
        }
      });
    }
    return () => {
      ignore = false;
    };
  }, [props]);

  //populate the song stats
  const populateSongStats = () => {
    return (
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button onClick={() => handleLike()}>
            {/* if the song is liked, show the red heart, else show the blue heart */}
            {isLiked ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteIcon color="primary" />
            )}
            <Typography>{likeCount}</Typography>
          </Button>
        </Box>
      </Box>
    );
  };

  const populateImage = () => {
    if (props.type === "artist") {
      return (
        <Box
          component="img"
          src={props.image}
          sx={{
            width: "300px",
            aspectRatio: "0.75",
            backgroundColor: "#2F294B",
          }}
        />
      );
    } else {
      return (
        <Box
          component="img"
          src={props.image}
          sx={{ width: "300px", aspectRatio: "1", backgroundColor: "#2F294B" }}
        />
      );
    }
  };

  const handleLike = async () => {
    if (isLiked) {
      console.log("put unlike logic here");
      await removeLikeOfObject(props.songId, "song", auth.currentUser.uid);
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      console.log("put like logic here");
      await addLikeOfObject(props.songId, "song", auth.currentUser.uid);
      setLikeCount(likeCount + 1);
      setIsLiked(true);
      createNotification(
        auth.currentUser.uid,
        props.postId,
        "like",
        props.data.userId
      );
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {populateImage()}
      {props.type === "song" ? populateSongStats() : ""}
    </Box>
  );
}
