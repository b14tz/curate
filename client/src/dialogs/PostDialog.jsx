import { React, useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Autocomplete,
  Box,
  Chip,
  Divider,
  Stack,
  IconButton,
  Typography,
  FormHelperText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import {
  fetchAllUserPlaylists,
  createSpotifyPost,
  getSpotifyToken,
  fetchUserSpotifyID,
  fetchSpotifyPlaylist,
} from "../interfaces/spotifyInterface";
import { addToUserPostList } from "../interfaces/userInterface";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import {
  getAppleMusicPlaylists,
  createApplePost,
  getMultipleSongData,
  getPlaylistTracksRelationship,
  isAuthorized,
} from "../interfaces/appleInterface";
import { createSearchTerms } from "../interfaces/SearchInterface";

function PlaylistDialog(props) {
  const [platform, setPlatform] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [playlistError, setPlaylistError] = useState(false);
  const [boolSpotify, setBoolSpotify] = useState(false);
  const [boolApple, setBoolApple] = useState(false);
  const [applePlaylists, setApplePlaylists] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let ignore = false;
    if (props.trigger) {
      getSpotifyToken(auth.currentUser.uid).then((token) => {
        if (!ignore) {
          console.log("this token", token);
          if (token === "") {
            setBoolSpotify(false);
          } else {
            setBoolSpotify(true);
          }
          fetchUserSpotifyID(token).then((spotifyId) => {
            fetchAllUserPlaylists(token, spotifyId).then((data) => {
              if (data) {
                console.log("spotify playlists", data);
                setPlaylists(data);
              } else {
              }
            });
          });
        }
      });

      // get apple music playlists
      try {
        // check that apple music is authorized
        isAuthorized().then((authorized) => {
          if (authorized) {
            getAppleMusicPlaylists(auth.currentUser.uid).then((data) => {
              console.log("apple music playlists", data);
              setApplePlaylists(data);
              setBoolApple(true);
            });
          }
        });
      } catch {
        console.log("apple music not connected");
        setBoolApple(false);
      }
    }
    return () => {
      ignore = true;
    };
  }, [props.trigger]);

  const handleSelectPlaylist = (event) => {
    setSelectedPlaylist(event.target.value);
    console.log("selected playlist: ", event.target.value);
  };

  const handleOriginChange = (event, newPlatform) => {
    if (newPlatform !== null) {
      setPlatform(newPlatform);
      console.log("new platform: ", newPlatform);
    }
  };

  const handleClose = () => {
    props.setTrigger(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setPlaylistError(false);
    //if playlist or title isn't set, throw error and display message
    if (title === "") {
      setTitleError(true);
      return;
    }
    if (selectedPlaylist === "") {
      setPlaylistError(true);
      return;
    }
    const userId = auth.currentUser.uid;
    let postId = "";
    let searchTerms = await createSearchTerms(title);
    if (platform === "spotify") {
      let token = await getSpotifyToken(auth.currentUser.uid);
      let spData = await fetchSpotifyPlaylist(token, selectedPlaylist);
      let isrcs = [];
      console.log("spData: ", spData);
      for (let i = 0; i < spData.length; i++) {
        for (let j = 0; j < spData[i].items.length; j += 1) {
          //console.log(spData.tracks.items[i].track)
          isrcs.push(spData[i].items[j].track.external_ids.isrc);
        }
      }
      postId = await createSpotifyPost(
        userId,
        title,
        selectedPlaylist,
        description,
        isrcs,
        tags,
        searchTerms
      );
    } else if (platform === "apple") {
      // getting playlist tracks relationship
      const playlistTrackRelationship =
        await getPlaylistTracksRelationship(selectedPlaylist);
      console.log("playlist track relationship: ", playlistTrackRelationship);

      // get catalog id for each song -> use to get isrc
      const catalogIds = playlistTrackRelationship.data.map((track) => {
        //console.log("track: ", track)
        //console.log("catalog id: ", track.attributes.playParams.catalogId)
        const catalogId = track.attributes.playParams.catalogId;
        return catalogId;
      });
      console.log("catalog ids: ", catalogIds);

      // get ISRCs from song ids
      const songData = await getMultipleSongData(catalogIds);
      const isrcs = songData.data.map((song) => {
        return song.attributes.isrc;
      });
      console.log("isrcs: ", isrcs);

      postId = await createApplePost(
        userId,
        title,
        selectedPlaylist,
        description,
        isrcs,
        tags,
        searchTerms
      );
    }
    await addToUserPostList(userId, postId);
    props.setTrigger(false);
    window.location.reload();
  };

  const renderPlaylistOptions = () => {
    if (platform === "spotify") {
      return playlists.map((playlist) => (
        <MenuItem key={playlist.id} value={playlist.id}>
          {playlist.name}
        </MenuItem>
      ));
    } else if (platform === "apple") {
      return applePlaylists.map((playlist) => (
        <MenuItem key={playlist.id} value={playlist.id}>
          {playlist.attributes.name}
        </MenuItem>
      ));
    }
  };

  const renderSpotifyButton = () => {
    return boolSpotify ? (
      <ToggleButton value="spotify">Spotify</ToggleButton>
    ) : null;
  };

  const renderAppleButton = () => {
    return boolApple ? (
      <ToggleButton value="apple">Apple Music</ToggleButton>
    ) : null;
  };

  const handleTags = (e, value) => {
    setTags(value);
    console.log(tags);
  };

  return props.trigger ? (
    <div id="post_popup">
      <Dialog open={props.trigger} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle> Upload Playlist </DialogTitle>
          <IconButton
            onClick={handleClose}
            sx={{ pr: "20px", "&:hover": { backgroundColor: "white" } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        {boolSpotify || boolApple ? (
          <>
            <DialogContent>
              <Stack spacing={3} sx={{ width: 500 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <InputLabel sx={{ mr: "10px" }}>Origin</InputLabel>
                  <ToggleButtonGroup
                    color="primary"
                    value={platform}
                    exclusive
                    onChange={handleOriginChange}
                    aria-label="Platform"
                  >
                    {renderSpotifyButton()}
                    {renderAppleButton()}
                  </ToggleButtonGroup>
                </Box>
                {titleError ? (
                  <FormControl error={true}>
                    <TextField
                      error
                      id="title_text"
                      label="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <FormHelperText>Setting a title is required</FormHelperText>
                  </FormControl>
                ) : (
                  <FormControl>
                    <TextField
                      id="title_text"
                      label="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormControl>
                )}
                {playlistError ? (
                  <FormControl
                    error={true}
                    fullWidth
                    disabled={platform === "" ? true : false}
                  >
                    <InputLabel id="select-label">Playlist</InputLabel>
                    <Select
                      labelId="select-label"
                      id="playlist-select"
                      value={selectedPlaylist}
                      label="Playlist"
                      onChange={handleSelectPlaylist}
                      defaultValue="Playlist Select"
                    >
                      {renderPlaylistOptions()}
                    </Select>
                    {platform === "" ? (
                      <FormHelperText>
                        Set an origin before selecting a playlist
                      </FormHelperText>
                    ) : null}
                    <FormHelperText>
                      Selecting a playlist is required
                    </FormHelperText>
                  </FormControl>
                ) : (
                  <FormControl
                    fullWidth
                    disabled={platform === "" ? true : false}
                  >
                    <InputLabel id="select-label">Playlist</InputLabel>
                    <Select
                      labelId="select-label"
                      id="playlist-select"
                      value={selectedPlaylist}
                      label="Playlist"
                      onChange={handleSelectPlaylist}
                      defaultValue="Playlist Select"
                    >
                      {renderPlaylistOptions()}
                    </Select>
                    {platform === "" ? (
                      <FormHelperText>
                        Set an origin before selecting a playlist
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
                <TextField
                  id="description_text"
                  label="Description"
                  multiline
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Autocomplete
                  multiple
                  id="tags"
                  options={popularTags.map((option) => option.name)}
                  freeSolo
                  value={tags}
                  onChange={handleTags}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Tags"
                      placeholder="Tags"
                    />
                  )}
                />
              </Stack>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                onClick={handleFormSubmit}
                endIcon={<SendIcon />}
              >
                {" "}
                Post{" "}
              </Button>
              {props.children}
            </DialogActions>
          </>
        ) : (
          <DialogContent sx={{ minHeight: "200px" }}>
            <Typography variant="h6">
              In order to post a playlist, connect your account to a streaming
              service first.
            </Typography>
            <Link to="/settings/connections" onClick={handleClose}>
              <Typography variant="h6">You can connect to one here</Typography>
            </Link>
          </DialogContent>
        )}
      </Dialog>
    </div>
  ) : (
    ""
  );
}

const popularTags = [
  { name: "Rap" },
  { name: "Workout" },
  { name: "Pop" },
  { name: "Country" },
  { name: "Rock" },
];

export default PlaylistDialog;
