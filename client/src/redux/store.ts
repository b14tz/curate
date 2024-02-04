// src/redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import spotifyReducer from "./features/spotify/spotifySlice";
import appleReducer from "./features/apple/appleSlice";
import { apiSlice } from "./api/apiSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
};

const combinedReducer = combineReducers({
    userReducer,
    spotifyReducer,
    appleReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the apiSlice reducer
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/PURGE",
                ],
                // Optionally ignore these field paths in all actions
                ignoredActionPaths: ["meta.arg", "payload.timestamp"],
                // Optionally ignore these paths in the state
                ignoredPaths: ["items.dates"],
            },
        }).concat(apiSlice.middleware),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
