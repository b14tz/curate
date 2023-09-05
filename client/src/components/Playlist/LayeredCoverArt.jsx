import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchSpotifyPlaylist } from "../../interfaces/spotifyInterface";
import { getClientToken } from "../../interfaces/clientAuthInterface";
import {
  getMultipleSongsByISRC,
  formatArtwork,
} from "../../interfaces/appleInterface";

export default function Art(props) {
  const [covers, setCovers] = useState([]);

  useEffect(() => {
    let ignore = false;
    getClientToken().then((token) => {
      if (!ignore) {
        if (props.special) {
          //fetch the playlist and get the tracks to display the cover art for
          fetchSpotifyPlaylist(token, props.postData.id).then((data) => {
            let coverArt = [];
            //set a limit for the amount of album art that can be displayed
            let limit = data[0]["total"] < 8 ? data[0]["total"] : 8;
            for (let i = 0; i < limit; i += 1) {
              //add the cover art to the coverArt array to display
              if (data[0].items[i].track.album.images.length > 0) {
                //console.log("images:", data[0].items[i].track.album.images[0])
                coverArt.push(
                  data[0]["items"][i]["track"]["album"]["images"][0]["url"]
                );
              }
              //console.log(`coverArt[${i}]: `, coverArt[i])
            }
            //console.log("covers: ", coverArt)
            setCovers(coverArt);
          });
        } else {
          if (props.postData.origin === "spotify") {
            //fetch the playlist and get the tracks to display the cover art for
            fetchSpotifyPlaylist(token, props.postData.playlistId).then(
              (data) => {
                let coverArt = [];
                //set a limit for the amount of album art that can be displayed
                let limit = data[0]["total"] < 8 ? data[0]["total"] : 8;
                for (let i = 0; i < limit; i += 1) {
                  //add the cover art to the coverArt array to display
                  coverArt.push(
                    data[0]["items"][i]["track"]["album"]["images"][0]["url"]
                  );
                  //console.log(`coverArt[${i}]: `, coverArt[i])
                }
                //console.log("covers: ", coverArt)
                setCovers(coverArt);
              }
            );
          } else if (props.postData.origin === "apple") {
            //fetch the playlist and get the tracks to display the cover art for
            getMultipleSongsByISRC(props.postData.isrcList).then((data) => {
              let coverArt = [];
              let limit =
                props.postData.isrcList.length < 8
                  ? props.postData.isrcList.length
                  : 8;
              for (let i = 0; i < limit; i += 1) {
                const url = formatArtwork(data[i]["attributes"]["artwork"]);
                coverArt.push(url);
              }
              setCovers(coverArt);
            });
          }
        }
      }
    });
    return () => {
      ignore = true;
    };
  }, [props.postData, props.special]);

  //return the cover art for the playlist so they are overlapping in the manner shown on the Figma diagrams
  if (covers.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: "50px" }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ width: "580px" }}>
      {covers.map((url, i) => {
        // offset the album art so they are overlapping, and total width is 580px
        let offset = 290 / covers.length;
        return (
          <Box
            component="img"
            key={i}
            src={url}
            sx={{
              position: "absolute",
              width: 180,
              aspectRatio: "1",
              backgroundColor: "2F294B",
              ml: `${210 - i * (offset - covers.length * 2)}px`,
            }}
          />
        );
      })}
    </Box>
  );
}
