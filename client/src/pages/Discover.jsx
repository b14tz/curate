import { Box, Typography, Divider } from "@mui/material";
import PlaylistTable from "../components/Playlist/PlaylistTable";
import { useEffect, useState } from "react";
import { getPopularPosts } from "../interfaces/feedInterface";
import { fetchTopPlaylists } from "../interfaces/spotifyInterface";
import TopPlaylistTable from "../components/Playlist/TopPlaylistTable";

export default function Discover() {
  const [feed, setFeed] = useState([]);
  const[top, setTop] = useState([])

  useEffect(() => {
    let ignore = false;
    getPopularPosts().then((postData) => {
      if (!ignore) {
        setFeed(postData);
      }
    });

        fetchTopPlaylists().then(data => {
            if(!ignore){
                setTop(data)
            }
        })

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Box
      sx={{
        width: "fit-content",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="header" sx={{ fontSize: "4rem", mx: "40px" }}>
          Discover
        </Typography>
        <Divider />
      </Box>
            <Box>
                <Typography variant="header" sx={{fontSize: '2rem', mx:"40px"}}>Top Spotify Playlists</Typography>
                <Divider/>
            </Box>
            <TopPlaylistTable topData={top}/>
            <Divider/>
            <Box>
                <Typography variant="header" sx={{fontSize: '2rem', mx:"40px"}}>Popular Curate Playlists</Typography>
                <Divider/>
            </Box>

      <PlaylistTable postData={feed} />
    </Box>
  );
}
