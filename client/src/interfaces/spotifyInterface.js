import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import axios from "axios";
import { getClientToken } from "./clientAuthInterface";

export const setSpotifyToken = async (userId, token) => {
  var timestamp = new Date();
  if (token === "") {
    await updateDoc(doc(db, "users", userId), {
      spotifyToken: token,
      spotifyTokenTs: null,
    });
  } else {
    await updateDoc(doc(db, "users", userId), {
      spotifyToken: token,
      spotifyTokenTs: timestamp.getTime(),
    });
  }
};

export const getSpotifyToken = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDoc);
  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    return data.spotifyToken;
  } else {
    console.log("No such spotify token");
    return null;
  }
};

//query for artists using token and search key
export const searchArtists = async (searchKey) => {
  let token = await getClientToken();
  if (token !== null) {
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: "%20artist:%20" + searchKey.replaceAll(" ", ""),
        type: "artist",
        limit: 20,
        market: "US",
      },
    });
    let results = [];
    data.artists.items.forEach((item) => {
      let url = null;
      if (item.images[2] !== undefined) {
        url = item.images[2].url;
      }
      let track = {
        artistName: item.name,
        imageURL: url,
        spotifyId: item.id,
      };
      results.push(track);
    });
    return results;
  }
};

export const getArtistInfo = async (id) => {
  let token = await getClientToken();
  if (token !== null) {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/artists/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          market: "US",
        },
      }
    );
    let artist = {
      artistName: data.name,
      imageURL: data.images[0].url,
    };
    return artist;
  }
};

export const getTopSongs = async (id) => {
  let token = await getClientToken();
  if (token !== null) {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/artists/" + id + "/top-tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          market: "US",
        },
      }
    );
    let results = [];
    data.tracks.forEach((item) => {
      let track = {
        isrc: item.external_ids.isrc,
        songName: item.name,
        albumName: item.album.name,
        duration: item.duration_ms,
      };
      results.push(track);
    });
    return results;
  }
};

export const searchSongs = async (searchKey) => {
  let token = await getClientToken();
  if (token !== null) {
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: "%20track:%20" + searchKey.replaceAll(" ", ""),
        type: "track",
        limit: 20,
        market: "US",
      },
    });
    let results = [];
    data.tracks.items.forEach((item) => {
      let isrc = null;
      if (item.external_ids.isrc !== undefined) {
        isrc = item.external_ids.isrc;
      }
      let track = {
        artistName: item.artists[0].name,
        songName: item.name,
        imageURL: item.album.images[1].url,
        isrc: isrc,
      };
      results.push(track);
    });
    return results;
  }
};

export const getSongByISRC = async (isrc) => {
  let token = await getClientToken();
  if (token !== null) {
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: "isrc:" + isrc,
        type: "track",
        market: "US",
      },
    });
    let result = [];
    //(data);
    data.tracks.items.forEach((item) => {
      let track = {
        artistName: item.artists[0].name,
        albumName: item.album.name,
        releaseDate: item.album.release_date,
        songName: item.name,
        imageURL: item.album.images[1].url,
        albumId: item.album.id,
        artistId: item.artists[0].id,
      };
      result.push(track);
    });
    return result;
  }
};

export const searchAlbums = async (searchKey) => {
  let token = await getClientToken();
  if (token !== null) {
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: "%20album:%20" + searchKey.replaceAll(" ", ""),
        type: "album",
        limit: 20,
        market: "US",
      },
    });
    let results = [];
    data.albums.items.forEach((item) => {
      let track = {
        artistName: item.artists[0].name,
        albumName: item.name,
        id: item.id,
        imageURL: item.images[1].url,
      };
      results.push(track);
    });
    return results;
  }
};

export const getAlbumByID = async (id) => {
  let token = await getClientToken();
  if (token !== null) {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/albums/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          offset: 0,
          limit: 40,
          market: "US",
        },
      }
    );
    let results = [];
    let track = {
      albumName: data.name,
      artistName: data.artists[0].name,
      artistId: data.artists[0].id,
      imageURL: data.images[0].url,
      releaseDate: data.release_date,
    };
    results.push(track);

    return results;
  }
};

export const getAlbumTracksByID = async (id) => {
  let token = await getClientToken();
  if (token !== null) {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/albums/" + id + "/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          offset: 0,
          limit: 40,
          market: "US",
        },
      }
    );
    let results = [];
    data.items.forEach((item) => {
      let track = {
        spotifyID: item.id,
      };
      results.push(track);
    });
    return results;
  }
};

export const getSongsBySpotifyID = async (ids) => {
  let token = await getClientToken();
  let results = [];
  if (token !== null) {
    const { data } = await axios.get("https://api.spotify.com/v1/tracks/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        market: "US",
        ids: ids,
      },
    });
    data.tracks.forEach((song) => {
      let track = {
        isrc: song.external_ids.isrc,
        songName: song.name,
        duration: song.duration_ms,
      };
      results.push(track);
    });
    return results;
  }
};

//fetch all playlists of a user
export const fetchAllUserPlaylists = async (token, spotifyId) => {
  if (token) {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 50,
        },
      }
    );

    //only return playlists where current user is the author
    let returnable = [];
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i]["owner"]["id"] === spotifyId) {
        returnable.push(data.items[i]);
      }
    }
    return returnable;
  }
};

// fetch the top 10 most popular playlists
export const fetchTopPlaylists = async () => {
  let token = await getClientToken();
  if (token) {
    const {data} = await axios.get('https://api.spotify.com/v1/browse/categories/toplists/playlists', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        limit: 10
      }
    })
    let topLists = []
    for (let i = 0; i < data.playlists.items.length; i+=1) {
      let info = data.playlists.items[i]
      //let info = await topPlaylistInfo(token, data.playlists.items[i].id)
      topLists.push(info);
    }

    //console.log(topLists)
    
    return topLists;
  }
}

//fetch top spotify playlist information based on id
export const topPlaylistInfo = async (token, playlistId) => {
  if(token){
    const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    return data
  }
}

//fetch users spotify id
export const fetchUserSpotifyID = async (token) => {
  if (token) {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.id;
  }
};

//fetch users spotify playlist and returns a list of isrcs
export const fetchSpotifyPlaylist = async (token, playlistId) => {
  if (token) {
    // modify to get all tracks with offset link
    let allData = [];
    let getNext = true;
    let url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    while (getNext) {
      let { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if ("tracks" in data) {
        allData.push(data.tracks);
        if (data.tracks.next !== null) {
          url = data.tracks.next;
          //console.log("next url: " + url)
        } else {
          getNext = false;
        }
      } else {
        allData.push(data);
        getNext = false;
      }
    }
    return allData;
  }
};

//fetch artist from spotify
export const fetchSpotifyArtist = async (token, artistId) => {
  if (token) {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
};

//add post to database
export const createSpotifyPost = async (
  userId,
  title,
  playlistId,
  description,
  isrcs,
  tags,
  searchTerms
) => {
  if (playlistId === "") return;
  try {
    const timeCreated = await Timestamp.fromDate(new Date());
    const docRef = await addDoc(collection(db, "post"), {
      userId: userId,
      title: title,
      playlistId: playlistId,
      description: description,
      likesList: [],
      likeCount: 0,
      commentsList: [],
      origin: "spotify",
      downloads: 0,
      isrcList: isrcs,
      time: timeCreated,
      searchTerms: searchTerms,
      tags: tags,
    });
    console.log("Spotify post written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error updating spotify post: ", e);
  }

  // try {
  //   const userDoc = doc(db, "users", userId, posts);
  //   await setDoc(userDoc, { spotify_id: spotifyId }, { merge: true });
  //   console.log("Spotify id updated successfully");
  // } catch (e) {
  //   console.error("Error updating spotify id: ", e);
  // }
};

export const createSpotifyPlaylist = async (
  userId,
  isrcs,
  token,
  title,
  description
) => {
  if (!(userId || isrcs || token || title)) {
    console.error("Error: one of the inputs was not set");
    return;
  }
  try {
    const createResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: title,
        description: description,
        public: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Playlist created:", createResponse.data.id);

    let trackUris = await convertISRCsToTracks(isrcs, token, "uris");

    try {
      const MAX_TRACKS_PER_REQUEST = 100;
      for (let i = 0; i < trackUris.length; i += MAX_TRACKS_PER_REQUEST) {
        const trackUrisChunk = trackUris.slice(i, i + MAX_TRACKS_PER_REQUEST);
        await axios.post(
          `https://api.spotify.com/v1/playlists/${createResponse.data.id}/tracks`,
          {
            uris: trackUrisChunk,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      console.log("Tracks added to playlist");
    } catch (error) {
      console.error("Error adding tracks to playlist:", error.response.data);
    }
  } catch (error) {
    console.error("Error creating playlist:", error.response.data);
  }
};

export const convertISRCsToTracks = async (isrcs, token, type) => {
  try {
    const tracks = [];
    // Iterate through each ISRC and retrieve track ID from ISRC using the Spotify API
    //console.log("func hit. isrc list length: ", isrcs.length)
    for (const isrc of isrcs) {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?type=track&q=isrc:${isrc}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (type === "uris") {
        // Extract track URI from the API response and add it to the array
        const trackURI = response.data.tracks.items[0]?.uri; // Take the first track from the search results
        if (trackURI) {
          tracks.push(trackURI);
        }
      } else if (type === "data") {
        const trackData = response.data.tracks.items[0];
        if (trackData) {
          tracks.push(trackData);
        }
      } else {
        console.error(
          "Error: invalid type for convertISRCsToTracks. Should be either uris or data"
        );
      }
    }
    return tracks;
  } catch (error) {
    console.error("Error converting ISRCs to track URIs:", error.response.data);
    return [];
  }
};
