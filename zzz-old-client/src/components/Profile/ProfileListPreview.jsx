import { React, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Link } from "react-router-dom";
import { getUsername } from "../../interfaces/userInterface";
import SmallAlbumArt from "../SmallAlbumArt";
import {
  getAllLikesOfObject,
  addLikeOfObject,
  removeLikeOfObject,
  getIsLiked,
} from "../../interfaces/likeInterface";
import { auth } from "../../config/firebase";
import styled from "styled-components";
import { createNotification } from "../../interfaces/notificationsInterface";

const DescriptionBox = styled(Box)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TitleBox = styled(Box)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default function ProfileListPreview(props) {
  const [username, setUsername] = useState("");
  const [likeCount, setLikeCount] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    let ignore = false;
    if (props.othersLists) {
      getUsername(props.data.userId).then((username) => {
        if (!ignore) {
          setUsername(username);
        }
      });
    }

    getAllLikesOfObject(props.postId, "post").then((data) => {
      if (!ignore) {
        //set the number of likes on the post
        setLikeCount(Object.keys(data).length);
        //check if the current user has liked the post
        getIsLiked(props.postId, "post", auth.currentUser.uid).then((bool) => {
          setIsLiked(bool);
        });
      }
    });
    return () => {
      ignore = true;
    };
  }, [props]);

  //handle if like was added or removed from the post
  const handleLike = async () => {
    if (isLiked) {
      console.log("put unlike logic here");
      await removeLikeOfObject(props.postId, "post", auth.currentUser.uid);
      //decrement like count
      setLikeCount(likeCount - 1);
      //set isLiked to false
      setIsLiked(false);
    } else {
      console.log("put like logic here");
      await addLikeOfObject(props.postId, "post", auth.currentUser.uid);
      //increment like count
      setLikeCount(likeCount + 1);
      //set isLiked to true
      setIsLiked(true);
      createNotification(
        auth.currentUser.uid,
        props.postId,
        "like",
        props.data.userId
      );
    }
  };
  //render the post author if the post is not the current user's
  const renderPostAuthor = () => {
    return props.othersLists ? (
      <Button href={`/user/${props.data.userId}`} style={{ minWidth: "0" }}>
        <AccountCircleIcon />
        <Typography sx={{ mr: "10px", textTransform: "none" }}>
          {username}
        </Typography>
      </Button>
    ) : null;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", mt: "20px" }}>
      <Box sx={{ height: "120px" }}>
        <SmallAlbumArt postData={props.data} />
      </Box>
      <Box>
        <TitleBox>
          <Link
            style={{ textDecoration: "none" }}
            to={`/playlist/${props.postId}`}
          >
            <Typography variant="h5" sx={{ color: "primary.main" }}>
              {props.data.title}
            </Typography>
          </Link>
        </TitleBox>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {renderPostAuthor()}
          <Button onClick={() => handleLike()} style={{ minWidth: "0" }}>
            {isLiked ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteIcon color="primary" />
            )}
            <Typography>{likeCount}</Typography>
          </Button>
          <Button
            style={{
              mr: "40px",
              textDecoration: "none",
              verticalAlign: "middle",
              display: "flex",
              flexDirection: "row",
              minWidth: "0",
            }}
          >
            <ModeCommentIcon sx={{ color: "primary.main" }} />
            <Typography sx={{ color: "primary.main" }}>
              {props.data.commentsList.length}
            </Typography>
          </Button>
        </Box>
        <DescriptionBox>
          <Typography>{props.data.description}</Typography>
        </DescriptionBox>
      </Box>
    </Box>
  );
}
