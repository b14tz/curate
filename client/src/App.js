import React from "react";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Settings from "./pages/Settings";
import Discover from "./pages/Discover";
import Feed from "./pages/Feed";
import SpotifyAuthPage from "./pages/SpotifyAuthPage";
import ViewSong from "./pages/ViewSong";
import ViewAlbum from "./pages/ViewAlbum";
import ViewArtist from "./pages/ViewArtist";
import ViewPlaylist from "./pages/ViewPlaylist";
import ViewTopPlaylist from "./pages/ViewTopPlaylist";
import SearchResults from "./pages/SearchResults";
import { Navigate } from "react-router-dom";
import ErrorMessage from "./components/errorMessage";
import PrivateRoute from "./utils/PrivateRoute";
import ConnectStreamingService from "./pages/ConnectStreamingService";
import User from "./pages/User";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <NavBar />
      <ErrorMessage />
      <Routes>
        <Route path="/" element={<Navigate to="/discover" />} />
        <Route path="navbar" element={<NavBar />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route
          path="spotify-auth"
          element={
            <PrivateRoute>
              <SpotifyAuthPage />
            </PrivateRoute>
          }
        />
        <Route
          path="settings/*"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="discover"
          element={
            <PrivateRoute>
              <Discover />
            </PrivateRoute>
          }
        />
        <Route
          path="feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route
          path="connect-streaming-service"
          element={
            <PrivateRoute>
              <ConnectStreamingService />
            </PrivateRoute>
          }
        />
        <Route path="search">
          <Route
            path=":searchTerm"
            element={
              <PrivateRoute>
                <SearchResults />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="user">
          <Route
            path=":userId"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="song">
          <Route
            path=":songisrc"
            element={
              <PrivateRoute>
                <ViewSong />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="album">
          <Route
            path=":albumId"
            element={
              <PrivateRoute>
                <ViewAlbum />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="artist">
          <Route
            path=":artistId"
            element={
              <PrivateRoute>
                <ViewArtist />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="playlist">
          <Route
            path=":postId"
            element={
              <PrivateRoute>
                <ViewPlaylist />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="top-playlist">
          <Route
            path=":topId"
            element={
              <PrivateRoute>
                <ViewTopPlaylist />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
