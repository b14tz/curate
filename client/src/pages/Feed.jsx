import { Box, Typography, Divider } from "@mui/material";
import PlaylistTable from "../components/Playlist/PlaylistTable";
import { useEffect, useState } from "react";
import { getFollowerPosts } from "../interfaces/feedInterface";
import { auth } from "../config/firebase";

export default function Feed() {
  const [feed, setFeed] = useState([]);
  useEffect(() => {
    let ignore = false;
    getFollowerPosts(auth.currentUser.uid).then((postData) => {
      if (!ignore) {
        setFeed(postData);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        margin: "auto",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="header" sx={{ fontSize: "4rem", mx: "40px" }}>
          Feed
        </Typography>
        <Divider />
      </Box>
      {Object.keys(feed).length === 0 ? (
        <Typography variant="h6" sx={{ mt: "5px" }}>
          Follow other users to populate your feed
        </Typography>
      ) : (
        <PlaylistTable postData={feed} />
      )}
    </Box>
  );
}
