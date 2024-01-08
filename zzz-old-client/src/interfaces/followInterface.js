import { db } from "../config/firebase";
import {
  getDoc,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";

export const addFollow = async (userId, otherUser) => {
  const currentRef = doc(db, "users", userId);
  const currentSnap = await getDoc(currentRef);

  if (currentSnap.exists()) {
    try {
      await updateDoc(currentRef, {
        followingList: arrayUnion(otherUser),
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("Current user not found!");
  }

  const followedRef = doc(db, "users", otherUser);
  const followedSnap = await getDoc(followedRef);

  if (followedSnap.exists()) {
    try {
      await updateDoc(followedRef, {
        followersList: arrayUnion(userId),
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("Followed user not found");
  }
};

export const removeFollow = async (userId, otherUser) => {
  const currentRef = doc(db, "users", userId);
  const currentSnap = await getDoc(currentRef);

  if (currentSnap.exists()) {
    try {
      await updateDoc(currentRef, {
        followingList: arrayRemove(otherUser),
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("Current user not found");
  }

  const unfollowedRef = doc(db, "users", otherUser);
  const unfollowedSnap = await getDoc(unfollowedRef);
  if (unfollowedSnap.exists()) {
    try {
      await updateDoc(unfollowedRef, {
        followersList: arrayRemove(userId),
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("Other user not found");
  }
};

export const getIsFollowing = async (userId, otherUser) => {
  const currentRef = doc(db, "users", userId);
  const currentSnap = await getDoc(currentRef);
  // console.log(currentSnap.data());
  if (currentSnap.data().followingList.includes(otherUser)) {
    return true;
  } else {
    return false;
  }
};

export const getFollowers = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDoc);
  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    return data.displayName;
  } else {
    console.log("No such user");
    return null;
  }
};
