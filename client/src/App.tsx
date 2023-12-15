import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

import Navbar from "./components/nav/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import { getUser } from "./api/routes/user";
import DiscoverPage from "./pages/DiscoverPage";

export default function App() {
    const [userData, setUserData] = useState({});
    const { isSignedIn, user } = useUser();
    useEffect(() => {
        async function getUserData() {
            if (isSignedIn) {
                console.log("i am logged in: ", user.id);
                const data = await getUser(user.id);
                setUserData(data);
            }
        }
        getUserData();
    }, [isSignedIn]);
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
                <Route path="discover" element={<DiscoverPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="profile" element={<ProfilePage />} />
            </Routes>
        </>
    );
}
