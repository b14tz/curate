import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getArtistInfo, getTopSongs } from "../interfaces/spotifyInterface";

export default function ViewArtist() {
  const { artistId } = useParams();

  const [artist, setArtist] = useState("Artist Name");

  const [image, setImage] = useState("");

  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let artistInfo = await getArtistInfo(artistId);
      setArtist(await artistInfo.artistName);
      setImage(await artistInfo.imageURL);

      let songInfo = await getTopSongs(artistId);
      setTopSongs((t) => [...t, ...songInfo]);
    }
    fetchData();
  }, [artistId]);

  function getTime(duration) {
    let time = new Date(duration);
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  }

  return (
    <Box
      className="content"
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        width: "80%",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          component="img"
          src={image}
          sx={{ width: "300px", aspectRatio: "1", backgroundColor: "#2F294B" }}
        />
      </Box>
      <Box sx={{ maxWidth: "600px", ml: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="header" sx={{ fontSize: "4rem" }}>
            {artist}
          </Typography>
          <Typography variant="header">Top Songs</Typography>
        </Box>
        <Divider sx={{ mb: "5px" }} />
        <Box>
          <Grid container>
            {topSongs.map((track, i) => (
              <Grid
                item
                key={i}
                xs={12}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Box key={i} id={i + 1} xs={{ width: "inherit" }}>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box width="1000px">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={"/song/" + track.isrc}
                      >
                        <Typography
                          variant="h5"
                          color="primary"
                          sx={{ mr: "20px" }}
                        >
                          {track.songName}
                        </Typography>
                      </Link>
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        color="primary"
                        sx={{ mr: "20px" }}
                      >
                        {getTime(track.duration)}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ mb: "5px" }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
