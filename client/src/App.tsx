// app.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/nav/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import SearchPage from "./pages/SearchPage";
import PostPage from "./pages/PostPage";
import SpotifyCallback from "./components/callbacks/SpotifyCallback";
import AuthCallback from "./components/callbacks/AuthCallback";
import DiscoverPage from "./pages/DiscoverPage";
import PlaylistPage from "./pages/PlaylistPage";

export default function App() {
    return (
        <>
            <Router>
                <div className="min-h-screen m-auto max-w-[1064px] flex flex-col justify-between md:p-14 p-10">
                    <div>
                        <Navbar />
                        <div className="my-10">
                            <AllRoutes />
                        </div>
                    </div>
                    <Footer />
                </div>
            </Router>
        </>
    );
}

function AllRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/following" element={<HomePage />} />

                <Route path="discover/spotify" element={<DiscoverPage />} />
                <Route path="discover/apple" element={<DiscoverPage />} />

                <Route path="search/users" element={<SearchPage />} />
                <Route
                    path="search/posts"
                    element={<SearchPage postsSearch />}
                />

                <Route path="user/:id" element={<UserPage />} />

                <Route path="post/:id" element={<PostPage />} />
                <Route
                    path="post/:id/comments"
                    element={<PostPage showComments />}
                />

                <Route path="top/spotify/:id" element={<PlaylistPage />} />
                <Route path="top/apple/:id" element={<PlaylistPage />} />

                {/* Callbacks */}
                <Route path="callback/auth" element={<AuthCallback />} />
                <Route path="callback/spotify" element={<SpotifyCallback />} />
            </Routes>
        </>
    );
}
