import axios from "axios"

// exporting the spotify api calls
export const getUserSpotifyAuthToken = (id) => axios.get(`/users/${id}/spotifyauth`)