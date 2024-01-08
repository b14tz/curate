// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./styles/index.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store.ts";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </QueryClientProvider>
    </React.StrictMode>
);
