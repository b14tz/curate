import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Box, createTheme, ThemeOptions } from "@mui/material";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

export default function App() {
    return (
        <>
            <Router>
                <div className="flex min-h-[100vh]">
                    <Navbar />
                    <div className="flex-1">
                        <div className="mt-2 mb-10">
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
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </>
    );
}
