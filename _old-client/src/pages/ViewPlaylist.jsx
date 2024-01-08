import React, { useEffect, useState } from "react";
import "./css/ViewPlaylist.css";
import Box from "@mui/material/Box";
import { Button, Typography, Chip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TagIcon from "@mui/icons-material/Tag";
import ViewList from "../components/View/ViewList";
import { Link, useParams } from "react-router-dom";
import { getPostData, getUsername } from "../interfaces/userInterface";
import {
  getSpotifyToken,
  fetchUserSpotifyID,
} from "../interfaces/spotifyInterface";
import { getClientToken } from "../interfaces/clientAuthInterface";
import {
  getAllLikesOfObject,
  addLikeOfObject,
  removeLikeOfObject,
  getIsLiked,
} from "../interfaces/likeInterface";
import { auth } from "../config/firebase";
import styled from "styled-components";
import WriteComment from "../components/Comments/WriteComment";
import { getPostComments } from "../interfaces/commentInterface";
import DownloadDialog from "../dialogs/DownloadDialog";
import { createNotification } from "../interfaces/notificationsInterface";

const AntiClippingTypography = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const AntiClippingButtonTypography = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ListItem = styled("li")(({ theme }) => ({
  marginRight: 5,
  marginBottom: 5,
}));

export default function ViewPlaylist() {
  const { postId } = useParams();

  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [origin, setOrigin] = useState("");
  const [userId, setUserId] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [saves, setSaves] = useState(0);
  const [numTracks, setNumTracks] = useState(0);
  const [likeCount, setLikeCount] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [isrcList, setIsrcList] = useState([]);
  const [spToken, setSpToken] = useState("");
  const [spotifyId, setSpotifyId] = useState("");
  const [appleId, setAppleId] = useState("");
  const [dialog, setDialog] = useState(false);
  const [tags, setTags] = useState([]);
  const [clientToken, setClientToken] = useState("");

  useEffect(() => {
    //gets and sets all post data
    let ignore = false;
    getClientToken().then((client) => {
      setClientToken(client);
      getPostData(postId).then((data) => {
        if (!ignore) {
          setUserId(data.userId);
          getUsername(data.userId).then((username) => {
            setUsername(username);
          });
          setTitle(data.title);
          setDescription(data.description);
          setCommentsList(data.commentsList);
          setOrigin(data.origin);
          setPlaylistId(data.playlistId);
          setSaves(data.downloads);
          setTags(data.tags);
          setIsrcList(data.isrcList);
          setNumTracks(data.isrcList.length);
          if (data.origin !== "") {
            getSpotifyToken(auth.currentUser.uid).then((token) => {
              setSpToken(token);
              fetchUserSpotifyID(token).then((id) => {
                setSpotifyId(id);
              });
            });
            setAppleId("NotNull"); // TODO: update with user apple id, just a placeholder for now
          } else {
            console.log("origin is unknown; can't set playlist data");
          }
          getPostComments(postId).then((data) => {
            setCommentData(data);
          });
        }
      });
    });
    getAllLikesOfObject(postId, "post").then((data) => {
      if (!ignore) {
        setLikeCount(Object.keys(data).length);
        getIsLiked(postId, "post", auth.currentUser.uid).then((bool) => {
          setIsLiked(bool);
        });
      }
    });
    return () => {
      ignore = true;
    };
  }, [postId, origin, playlistId]);

  const handleLike = async () => {
    if (isLiked) {
      await removeLikeOfObject(postId, "post", auth.currentUser.uid);
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      await addLikeOfObject(postId, "post", auth.currentUser.uid);
      setLikeCount(likeCount + 1);
      setIsLiked(true);
      createNotification(auth.currentUser.uid, postId, "like", userId);
    }
  };

  return (
    <Box sx={{ margin: "auto", width: "80%" }}>
      <AntiClippingTypography variant="header" sx={{ fontSize: "4rem" }}>
        {title}
      </AntiClippingTypography>
      <AntiClippingTypography variant="h4">
        {description}
      </AntiClippingTypography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mt: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mr: "10px",
            }}
          >
            <Button onClick={() => handleLike()}>
              {isLiked ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteIcon color="primary" />
              )}
              <Typography variant="h5">{likeCount}</Typography>
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mr: "20px",
              color: "#2F294B",
            }}
          >
            <ModeCommentIcon />
            <Typography variant="h5">{commentsList.length}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mr: "20px",
              color: "#2F294B",
            }}
          >
            <DownloadForOfflineIcon />
            <Typography variant="h5">{saves}</Typography>
          </Box>
          <Button variant="contained" sx={{ mr: "20px" }}>
            <AntiClippingButtonTypography onClick={() => setDialog(true)}>
              Save to Library
            </AntiClippingButtonTypography>
          </Button>
          <Typography variant="h5">{numTracks} Songs</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              listStyle: "none",
              mr: "20px",
              color: "#2F294B",
            }}
            component="ul"
          >
            {tags.map((data) => {
              let icon = <TagIcon />;

              return (
                <ListItem key={data}>
                  <Chip
                    icon={icon}
                    label={data}
                    variant="outlined"
                    //size='small'
                    color="primary"
                  />
                </ListItem>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <AccountCircleIcon />
          <Link style={{ textDecoration: "none" }} to={`/user/${userId}`}>
            <Typography color="primary.main" variant="h5">
              {username}
            </Typography>
          </Link>
        </Box>
      </Box>

      <ViewList
        type="playlist"
        isrcs={isrcList}
        spotifyToken={clientToken}
        origin={origin}
      />

      <Typography variant="h4" sx={{ mt: "20px" }}>
        {commentsList.length} Comments
      </Typography>
      <WriteComment postId={postId} authorId={userId} sx={{ width: "100%" }} />
      <ViewList type="comment" data={commentData} />
      <DownloadDialog
        postId={postId}
        dialog={dialog}
        setDialog={setDialog}
        saves={saves}
        setSaves={setSaves}
        spotifyId={spotifyId}
        appleId={appleId}
        isrcList={isrcList}
        spToken={spToken}
        title={title}
        description={description}
      />
    </Box>
  );
}
