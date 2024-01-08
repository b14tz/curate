// set up cntext for user authentication via firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useState, useEffect, createContext, useContext } from "react";
import { signOut } from "firebase/auth";

// This file creates contexts related to firbase authentication
// It is provided as a wrapper to other pages to utilize the user auth
// and reduce imports

const AuthContext = createContext();

// useAuth is the hook to child components can use to acces these functions
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  function register(email, password) {
    // user signed in automatically
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setAuthenticated(false);
    return signOut(auth);
  }

  // when auth changes, update current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    authenticated,
    login,
    register,
    error,
    setError,
    logout,
    setAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
