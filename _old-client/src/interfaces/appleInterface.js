import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";

// API for interacting with apple music
// NOTE: the apple music kit must be loaded before these functions are used

// load apple music kit. Music be done before caling other functions
export async function loadAppleMusicKit() {
  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const script = document.createElement("script");
  script.src = "https://js-cdn.music.apple.com/musickit/v1/musickit.js";
  //script.async = true;
  document.head.appendChild(script);

  // delay to allow script to load
  await delay(100);

  await fetch("http://localhost:8001/apple-token")
    .then((response) => response.json())
    .then(async (data) => {
      await window.MusicKit.configure({
        developerToken: data.token,
        app: {
          name: "Curate",
          build: "1.0.0",
        },
      });
      console.log("MusicKit configured");
    });
}

export async function authorizeAppleMusic() {
  await loadAppleMusicKit();
  const music = await window.MusicKit.getInstance();
  await music.authorize();
  console.log("Apple Music Authorized");
}

export async function unauthorizeAppleMusic() {
  await loadAppleMusicKit();
  const music = window.MusicKit.getInstance();
  await music.unauthorize();
  console.log("Apple Music Unauthorized");
}

export async function getAppleMusicPlaylists() {
  try {
    await loadAppleMusicKit();
    const music = window.MusicKit.getInstance();
    const playlists = await music.api.library.playlists();
    return playlists;
  } catch (e) {
    return null;
  }
}

export async function getAppleMusicPlaylistData(playlistId) {
  await loadAppleMusicKit();
  const music = window.MusicKit.getInstance();
  //await music.authorize();
  const playlist = await music.api.library.playlist(playlistId);
  return playlist;
}

export async function getPlaylistCatalogRelationship(playlistId) {
  await loadAppleMusicKit();
  const music = window.MusicKit.getInstance();
  console.log("musickit instance: ", music);
  return fetch(
    `https://api.music.apple.com/v1/me/library/playlists/${playlistId}/catalog`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + music.developerToken,
        "Music-User-Token": music.musicUserToken,
      },
    }
  ).then((response) => response.json());
}

export async function getPlaylistTracksRelationship(playlistId) {
  await loadAppleMusicKit();
  const music = window.MusicKit.getInstance();
  console.log("musickit instance: ", music);
  return fetch(
    `https://api.music.apple.com/v1/me/library/playlists/${playlistId}/tracks`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + music.developerToken,
        "Music-User-Token": music.musicUserToken,
      },
    }
  ).then((response) => response.json());
}

export async function getPlaylistArtwork(playlistId) {
  const trackData = await getPlaylistTracksRelationship(playlistId);
  return trackData.data.map((track) => formatArtwork(track.attributes.artwork));
}

export function formatArtwork(artwork) {
  return window.MusicKit.formatArtworkURL(artwork, 200, 200);
}

export async function createApplePost(
  userId,
  title,
  playlistId,
  description,
  isrcs,
  tags,
  searchTerms
) {
  if (playlistId === "") return;

  // try to add post to database
  const timeCreated = Timestamp.fromDate(new Date());
  const postData = {
    userId: userId,
    title: title,
    playlistId: playlistId,
    description: description,
    likesList: [],
    likeCount: 0,
    commentsList: [],
    origin: "apple",
    downloads: 0,
    isrcList: isrcs,
    time: timeCreated,
    tags: tags,
    searchTerms: searchTerms,
  };
  try {
    const docRef = await addDoc(collection(db, "post"), postData);
    console.log("Apple post written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding apple post: ", e);
  }
}

export async function getMultipleSongData(songIds) {
  // NOTE: songIds must be catalogIds
  await loadAppleMusicKit();
  const music = window.MusicKit.getInstance();
  const dev_token = music.developerToken;
  console.log("dev token: ", dev_token);
  return fetch(
    "https://api.music.apple.com/v1/catalog/us/songs?ids=" + songIds.join(","),
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + dev_token,
      },
    }
  ).then((response) => response.json());
}

export async function getSongData(songId) {
  // NOTE: the song id must be the catalogId
  await loadAppleMusicKit();
  const music = window.MusicKit.getInstance();
  console.log("retreiving song data for song id: ", songId);
  return fetch(`https://api.music.apple.com/v1/catalog/us/songs/${songId}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + music.developerToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export async function isAuthorized() {
  await loadAppleMusicKit();
  const music = window.MusicKit.getInstance();
  return await music.isAuthorized;
}

export async function getMultipleSongsByISRC(isrcs) {
  await loadAppleMusicKit();
  const music = window.MusicKit.getInstance();
  const dev_token = music.developerToken;
  console.log("dev token: ", dev_token);

  // split into chunks of 25 isrcs each
  const isrcChunks = [];
  for (let i = 0; i < isrcs.length; i += 25) {
    isrcChunks.push(isrcs.slice(i, i + 25));
  }

  // get tracks for the playlist from isrcs
  const tracks = [];
  for (let i = 0; i < isrcChunks.length; i++) {
    const isrcChunk = isrcChunks[i];
    const trackData = await fetch(
      "https://api.music.apple.com/v1/catalog/us/songs?filter[isrc]=" +
        isrcChunk.join(","),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + dev_token,
        },
      }
    ).then((response) => response.json());
    tracks.push(...trackData.data);
  }
  return tracks;

  /*
    return fetch('https://api.music.apple.com/v1/catalog/us/songs?filter[isrc]=' + isrcs.join(","), {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + dev_token,
        },
    }).then(response => response.json())

    */
}

export async function createAppleMusicPlaylistFromISRCs(
  isrcs,
  title,
  description
) {
  await loadAppleMusicKit();
  const music = window.MusicKit.getInstance();

  // get tracks for the playlist from isrcs
  const tracks = await getMultipleSongsByISRC(isrcs);
  console.log("tracks: ", tracks);

  // remove tracks with duplicate isrc values
  const uniqueTracks = [];
  const isrcsSeen = new Set();
  tracks.forEach((track) => {
    if (!isrcsSeen.has(track.attributes.isrc)) {
      uniqueTracks.push(track);
      isrcsSeen.add(track.attributes.isrc);
    }
  });

  // create track relationships from unique tracks
  const trackRelationships = uniqueTracks.map((track) => {
    return {
      id: track.id,
      type: "songs",
    };
  });

  console.log("track relationships: ", trackRelationships);

  // create playlist in users library
  console.log("creating playlist...");
  return fetch("https://api.music.apple.com/v1/me/library/playlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + music.developerToken,
      "Music-User-Token": music.musicUserToken,
    },
    body: JSON.stringify({
      attributes: {
        name: title,
        description: description,
      },
      relationships: {
        tracks: {
          data: trackRelationships,
        },
        parent: {
          data: [
            {
              id: "p.playlistsroot",
              type: "library-playlist-folders",
            },
          ],
        },
      },
    }),
  });
}
