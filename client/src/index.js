import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './styles/theme'
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import "./config/firebase";

const root = ReactDOM.createRoot(document.getElementById('root'));
const modeTheme = theme
root.render(
    <React.StrictMode>
            <ThemeProvider theme={modeTheme}>
                <AuthProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AuthProvider>
            </ThemeProvider>
    </React.StrictMode>
);
