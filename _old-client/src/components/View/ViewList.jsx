import React, { useEffect, useState } from "react";
import SongListItem from "../SongListItem";
import { Box, Grid, LinearProgress } from "@mui/material";
import TopSongsItem from "../TopSongsItem";
import ProfileListPreview from "../Profile/ProfileListPreview";
import ViewPlaylistItem from "./ViewPlaylistItem";
import ViewPlaylistComment from "./ViewPlaylistComment";
import { convertISRCsToTracks } from "../../interfaces/spotifyInterface";

export default function ViewList(props) {
  //set new states for the list
  const [list, setList] = useState([]);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      //if the list is a playlist, convert the isrcs to tracks
      if (props.type === "playlist") {
        //convert the isrcs to tracks
        if (!(props.spotifyToken === "" || props.isrcs === [])) {
          convertISRCsToTracks(props.isrcs, props.spotifyToken, "data").then(
            (data) => {
              let temp = {};
              //if playlist is over 100 songs, it only shows first 100
              let limit = data.length > 100 ? 100 : data.length;
              //for each track, set the title, artist, isrc, and image
              for (let i = 0; i < limit; i++) {
                let title = data[i].name;
                let artist = data[i].artists[0].name;
                let artistId = data[i].artists[0].id;
                let isrc = data[i].external_ids.isrc;
                let image = data[i].album.images[0].url;
                temp[i] = {
                  title: title,
                  artist: artist,
                  isrc: isrc,
                  image: image,
                  artist_id: artistId,
                };
              }
              setList(temp);
            }
          );
        }
      }
      if (props.type === "comment") {
        setList(props.data);
      }
    }
    return () => {
      ignore = true;
    };
  }, [props]);

  //render the list
  const renderList = () => {
    //if the list is a playlist, render the playlist
    if (props.type === "playlist") {
      return renderPlaylist();
    } //if the list is a song, render the song
    else if (props.type === "song") {
      return renderTrackList();
    } //if the list is an album, render the album
    else if (props.type === "album") {
      return renderAlbumList();
    } //if the list is a artist, render the artist
    else if (props.type === "artist") {
      return renderTopSongs();
    } //if the list is a comment, render the comment
    else if (props.type === "comment") {
      return renderComments();
    } //otherwise, print out an error to the console
    else {
      console.error("type of viewable item wasn't passed");
    }
  };

  //render the playlist
  const renderPlaylist = () => {
    return Object.keys(list).map((key) => (
      <Grid
        item
        key={key}
        xs={12}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box key={key} id={key} xs={{ width: "inherit" }}>
          <ViewPlaylistItem
            title={list[key]["title"]}
            artist={list[key]["artist"]}
            isrc={list[key]["isrc"]}
            image={list[key]["image"]}
            artistId={list[key]["artist_id"]}
          />
        </Box>
      </Grid>
    ));
  };
  //render the track list
  const renderTrackList = () => {
    return Object.keys(list).map((key) => (
      <Grid
        item
        key={key}
        xs={12}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box key={key} id={key} xs={{ width: "inherit" }}>
          <ProfileListPreview />
        </Box>
      </Grid>
    ));
  };
  //render the album list
  const renderAlbumList = () => {
    return (
      <Grid
        item
        key={1}
        xs={12}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box key={1} id={1} xs={{ width: "inherit" }}>
          <SongListItem />
        </Box>
      </Grid>
    );
  };
  //render the top songs
  const renderTopSongs = () => {
    return (
      <Grid
        item
        key={1}
        xs={12}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box key={1} id={1} xs={{ width: "inherit" }}>
          <TopSongsItem />
        </Box>
      </Grid>
    );
  };
  //render the comments
  const renderComments = () => {
    return Object.keys(list).map((key) => (
      <Grid
        item
        key={key}
        xs={12}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box key={key} id={key} xs={{ width: "inherit" }}>
          <ViewPlaylistComment
            description={list[key].content}
            userId={list[key].userId}
            time={list[key].ts}
          />
        </Box>
      </Grid>
    ));
  };

  return (
    <Box>
      {Object.keys(list).length === 0 && props.type === "playlist" ? (
        <Box sx={{ width: "100%", mt: "30px" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Grid container>{renderList()}</Grid>
      )}
    </Box>
  );
}
