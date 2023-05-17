import { Typography, Box, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useEffect, useState } from "react";
import { getUsername } from "../../interfaces/userInterface";
import { auth } from "../../config/firebase";
import {
  getAllLikesOfObject,
  addLikeOfObject,
  removeLikeOfObject,
  getIsLiked,
} from "../../interfaces/likeInterface";
import styled from "styled-components";
import { createNotification } from "../../interfaces/notificationsInterface";

const TimeBox = styled(Box)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default function PostStats(props) {
  const [username, setUsername] = useState("");
  const [likeCount, setLikeCount] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    let ignore = false;
    //get the username of the user who made the post
    getUsername(props.userId).then((username) => {
      if (!ignore) {
        setUsername(username);
      }
    });
    //get the number of likes on the post
    getAllLikesOfObject(props.postId, "post").then((data) => {
      if (!ignore) {
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
      await removeLikeOfObject(props.postId, "post", auth.currentUser.uid);
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      await addLikeOfObject(props.postId, "post", auth.currentUser.uid);
      setLikeCount(likeCount + 1);
      setIsLiked(true);
      createNotification(
        auth.currentUser.uid,
        props.postId,
        "like",
        props.userId
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {props.page !== "other" ? (
          <Button
            href={`/user/${props.userId}`}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                color: "primary.main",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                minWidth: "0",
              }}
            >
              <AccountCircleIcon />
              <Typography variant="h6" fontSize={20} textTransform="none">
                {username}
              </Typography>
            </Box>
          </Button>
        ) : null}

        <Button onClick={() => handleLike()} sx={{ minWidth: "0" }}>
          {isLiked ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteIcon color="primary" />
          )}
          <Typography variant="h6">{likeCount}</Typography>
        </Button>
        <Box
          sx={{
            color: "primary.main",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mx: "5px",
          }}
        >
          <ModeCommentIcon />
          <Typography variant="h6" sx={{}}>
            {props.comments}
          </Typography>
        </Box>

        <TimeBox>
          <Typography variant="h6" sx={{ ml: "10px" }}>
            {props.time}
          </Typography>
        </TimeBox>
      </Box>
    </Box>
  );
}
