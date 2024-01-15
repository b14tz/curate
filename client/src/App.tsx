// app.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Navbar from "./components/nav/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import SearchPage from "./pages/SearchPage";
import DiscoverPage from "./pages/DiscoverPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/user/userSlice";
import PostPage from "./pages/PostPage";
import SpotifyCallback from "./components/callbacks/SpotifyCallback";
import AuthCallback from "./components/callbacks/AuthCallback";

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
    const dispatch = useDispatch();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            const data: { user: {} } = jwtDecode(token);
            dispatch(setUser(data.user));
        }
    }, []);
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="discover" element={<DiscoverPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="user/:id" element={<UserPage />} />
                <Route path="post/:id" element={<PostPage />} />
                {/* Callbacks */}
                <Route path="callback/auth" element={<AuthCallback />} />
                <Route path="callback/spotify" element={<SpotifyCallback />} />
            </Routes>
        </>
    );
}
