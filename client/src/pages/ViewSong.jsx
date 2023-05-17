import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ViewArtAndLinks from "../components/View/ViewArtAndLinks";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { getSongByISRC } from "../interfaces/spotifyInterface";

export default function ViewSong() {
  const { songisrc } = useParams();
  const [songName, setSongName] = useState("Song Title");
  const [artist, setArtist] = useState("Artist");
  const [artistId, setArtistId] = useState("");
  const [album, setAlbum] = useState("Album");
  const [albumId, setAlbumId] = useState("");
  const [releaseDate, setReleaseDate] = useState("Year");
  const [image, setImage] = useState("");

  useEffect(() => {
    getSongByISRC(songisrc).then((result) => {
      setSongName(result[0].songName);
      setArtist(result[0].artistName);
      setArtistId(result[0].artistId);
      setAlbum(result[0].albumName);
      setAlbumId(result[0].albumId);
      setReleaseDate(result[0].releaseDate);
      setImage(result[0].imageURL);
    });
  }, [songisrc]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        width: "80%",
        justifyContent: "center",
      }}
    >
      <ViewArtAndLinks type="song" songId={songisrc} image={image} />
      <Box sx={{ maxWidth: "600px", ml: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="header" sx={{ fontSize: "4rem" }}>
            {songName}
          </Typography>
          <Box display={"flex"}>
            <Link
              to={"/artist/" + artistId}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography variant="h4" sx={{ mt: "-20px", mb: "-15px" }}>
                {artist}
              </Typography>
            </Link>
            <Link
              to={"/album/" + albumId}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography variant="h4" sx={{ mt: "-20px", mb: "-15px" }}>
                {", " + album + ", "}
              </Typography>
            </Link>
            <Typography variant="h4" sx={{ mt: "-20px", mb: "-15px" }}>
              {releaseDate}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
