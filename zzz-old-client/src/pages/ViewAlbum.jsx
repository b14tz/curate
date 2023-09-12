import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Link, useParams } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import {
  getAlbumByID,
  getAlbumTracksByID,
  getSongsBySpotifyID,
} from "../interfaces/spotifyInterface";

export default function ViewAlbum() {
  const { albumId } = useParams();

  const [albumName, setAlbumName] = useState("Album Name");

  const [artistName, setArtistName] = useState("Artist");

  const [artistId, setArtistId] = useState("");

  const [releaseDate, setReleaseDate] = useState("Release Date");

  const [tracks, setTracks] = useState([]);

  const [image, setImage] = useState("");

  //console.log(tracks);

  useEffect(() => {
    async function fetchData() {
      let albumInfo = await getAlbumByID(albumId);
      let songIds = await getAlbumTracksByID(albumId);

      let ids = "";
      songIds.forEach((id) => {
        ids += id.spotifyID + ",";
      });
      ids = ids.substring(0, ids.length - 1);
      let results = await getSongsBySpotifyID(ids);

      setAlbumName(await albumInfo[0].albumName);
      setArtistName(await albumInfo[0].artistName);
      setArtistId(await albumInfo[0].artistId);
      setReleaseDate(await albumInfo[0].releaseDate);
      setImage(await albumInfo[0].imageURL);

      setTracks((t) => [...t, ...results]);
    }

    fetchData();
  }, [albumId]);

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: "10px",
          }}
        ></Box>
      </Box>
      <Box sx={{ maxWidth: "600px", ml: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="header" sx={{ fontSize: "4rem" }}>
            {albumName}
          </Typography>
          <Box display="flex">
            <Link
              to={"/artist/" + artistId}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography variant="h4" sx={{ mt: "-20px", mb: "-15px" }}>
                {artistName}
              </Typography>
            </Link>
            <Typography variant="h4" sx={{ mt: "-20px", mb: "-15px" }}>
              {", " + releaseDate}
            </Typography>
          </Box>
          <Typography variant="header">Tracklist</Typography>
        </Box>
        <Divider sx={{ mb: "5px" }} />
        <Box>
          <Grid container>
            {tracks.map((track, i) => (
              <Grid
                item
                key={i}
                xs={12}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Box key={i} id={i + 1} xs={{ width: "inherit" }}>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ width: "1000px" }}>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
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
