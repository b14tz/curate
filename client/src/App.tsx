import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Navbar from "./components/nav/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import DiscoverPage from "./pages/DiscoverPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/user/userSlice";

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
                <Route path="profile" element={<ProfilePage />} />
            </Routes>
        </>
    );
}
