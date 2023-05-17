import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { fetchSpotifyPlaylist } from "../interfaces/spotifyInterface";
import { getClientToken } from "../interfaces/clientAuthInterface";
import { getMultipleSongsByISRC, formatArtwork } from "../interfaces/appleInterface";

export default function SmallAlbumArt(props) {
  const [covers, setCovers] = useState([]);

  useEffect(() => {
    let ignore = false;
    getClientToken().then((token) => {
        if (!ignore) {
            if (props.postData.origin === "spotify") {

              // get cover art from spotify
              fetchSpotifyPlaylist(token, props.postData.playlistId).then((data) => {
                  let coverArt = {};
                  let limit = data[0]["items"].length < 5 ? data[0]["items"].length : 5;
                  for (let i = 0; i < limit; i += 1) {
                    coverArt[i] =
                      data[0]["items"][i]["track"]["album"]["images"][0]["url"];
                  }
                  setCovers(coverArt);
                });

            } else if (props.postData.origin === "apple") {

                //fetch cover art from apple music
                getMultipleSongsByISRC(props.postData.isrcList).then((data) => {
                    let coverArt = []
                    let limit = props.postData.isrcList.length < 5 ? props.postData.isrcList.length : 5
                    for (let i = 0; i < limit; i+=1) {
                        const url = formatArtwork(data[i]["attributes"]["artwork"])
                        coverArt.push(url)
                    }
                    setCovers(coverArt)
                });
            }
        }
      });
    return () => {
      ignore = true;
    };
  }, [props.postData]);

  return (
    <Box sx={{ width: "150px" }}>
      <Box
        component="img"
        src={covers[4]}
        sx={{
          position: "absolute",
          height: "120px",
          aspectRatio: "1",
          backgroundColor: "primary.main",
          mr: "10px",
          clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
        }}
      />
      <Box
        component="img"
        src={covers[0]}
        sx={{
          position: "absolute",
          height: "120px",
          aspectRatio: "1",
          backgroundColor: "primary.main",
          mr: "10px",
          clipPath: "polygon(20% 0%, 20% 100%, 100% 100%, 100% 0%)",
        }}
      />
      <Box
        component="img"
        src={covers[1]}
        sx={{
          position: "absolute",
          height: "120px",
          aspectRatio: "1",
          backgroundColor: "primary.main",
          mr: "10px",
          clipPath: "polygon(40% 0%, 40% 100%, 100% 100%, 100% 0%)",
        }}
      />
      <Box
        component="img"
        src={covers[2]}
        sx={{
          position: "absolute",
          height: "120px",
          aspectRatio: "1",
          backgroundColor: "primary.main",
          mr: "10px",
          clipPath: "polygon(60% 0%, 60% 100%, 100% 100%, 100% 0%)",
        }}
      />
      <Box
        component="img"
        src={covers[3]}
        sx={{
          position: "absolute",
          height: "120px",
          aspectRatio: "1",
          backgroundColor: "primary.main",
          mr: "10px",
          clipPath: "polygon(80% 0%, 80% 100%, 100% 100%, 100% 0%)",
        }}
      />
    </Box>
  );
}
