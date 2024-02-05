// app.tsx
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
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
                <div className="min-h-screen m-auto max-w-[920px] flex flex-col justify-between p-5">
                    <div>
                        <Navbar />
                        <div className="my-5">
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
                <Route path="/" element={<Navigate to="/feed" replace />} />
                <Route path="/feed" element={<HomePage />} />
                <Route path="/feed/following" element={<HomePage />} />

                <Route
                    path="/discover"
                    element={<Navigate to="/discover/spotify" replace />}
                />
                <Route path="/discover/spotify" element={<DiscoverPage />} />
                <Route path="/discover/apple" element={<DiscoverPage />} />

                <Route
                    path="/search"
                    element={<Navigate to="/search/users" />}
                />
                <Route path="/search/users" element={<SearchPage />} />
                <Route
                    path="/search/posts"
                    element={<SearchPage postsSearch />}
                />

                <Route path="/post/:id" element={<PostPage />} />
                <Route
                    path="/post/:id/comments"
                    element={<PostPage showComments />}
                />

                <Route path="/top/spotify/:id" element={<PlaylistPage />} />
                <Route path="/top/apple/:id" element={<PlaylistPage />} />

                <Route path="/user/:id" element={<UserPage />} />

                {/* Callbacks */}
                <Route path="/callback/auth" element={<AuthCallback />} />
                <Route path="/callback/spotify" element={<SpotifyCallback />} />
            </Routes>
        </>
    );
}
