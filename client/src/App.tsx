import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import {
//     SignedIn,
//     SignedOut,
//     UserButton,
//     useUser,
//     RedirectToSignIn,
// } from "@clerk/clerk-react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

export default function App() {
    return (
        <>
            <Router>
                <div className="min-h-screen m-auto max-w-[1064px] md:p-14 p-10">
                    <Navbar />
                    <div>
                        <div className="my-10">
                            <AllRoutes />
                        </div>
                        <Footer />
                    </div>
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
                <Route path="feed" element={<FeedPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="signin" element={<SignInPage />} />
                <Route path="signup" element={<SignUpPage />} />
            </Routes>
        </>
    );
}
