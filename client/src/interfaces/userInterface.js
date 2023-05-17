import { db } from "../config/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  list,
} from "firebase/storage";
import { storage } from "../config/firebase";

export const getUsername = async (userId) => {
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

export const setUsername = async (userId, username) => {
  if (username === "") return;
  try {
    const userDoc = doc(db, "users", userId);
    await setDoc(userDoc, { displayName: username }, { merge: true });
    console.log("Username updated successfully");
  } catch (e) {
    console.error("Error updating username: ", e);
  }
};

export const setFirstName = async (userId, firstName) => {
  if (firstName === "") return;
  try {
    const userDoc = doc(db, "users", userId);
    await setDoc(userDoc, { firstName: firstName }, { merge: true });
    console.log("First name updated successfully");
  } catch (e) {
    console.error("Error updating first name: ", e);
  }
};

export const setLastName = async (userId, lastName) => {
  if (lastName === "") return;
  try {
    const userDoc = doc(db, "users", userId);
    await setDoc(userDoc, { lastName: lastName }, { merge: true });
    console.log("Last name updated successfully");
  } catch (e) {
    console.error("Error updating last name: ", e);
  }
};

export const setEmail = async (userId, email) => {
  if (email === "") return;
  // TODO: make sure email is valid
  try {
    const userDoc = doc(db, "users", userId);
    await setDoc(userDoc, { email: email }, { merge: true });
    console.log("Email updated successfully");
  } catch (e) {
    console.error("Error updating email: ", e);
  }
};

export const setBio = async (userId, bio) => {
  if (bio === "") return;
  try {
    const userDoc = doc(db, "users", userId);
    await setDoc(userDoc, { bio: bio }, { merge: true });
    console.log("Bio updated successfully");
  } catch (e) {
    console.error("Error updating bio: ", e);
  }
};

export const setProfilePicture = async (userId, file) => {
  const storageRef = ref(storage, `avatars/${userId}/avatar.jpg`);
  await uploadBytes(storageRef, file);
  console.log("Uploaded Avatar image");
};

export const getProfilePicture = async (userId) => {
  const storageRef = ref(storage, `avatars/${userId}/avatar.jpg`);
  try {
    // Check if the file exists
    const listResult = await list(storageRef.parent);
    const fileExists = listResult.items.some((item) => item.name === storageRef.name);
    if (!fileExists) {
      //console.log("No avatar found");
      return null;
    }

    // If the file exists, get its download URL
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (e) {
    console.error(e);
    return null;
  }
};


export const deleteProfilePicture = async (userId) => {
  const storageRef = ref(storage, `avatars/${userId}/avatar.jpg`);
  try {
    await deleteObject(storageRef);
    console.log("Avatar deleted");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getAllUserData = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDoc);
  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    return data;
  } else {
    console.log("No such user");
    return null;
  }
};

export const getUsesSpotify = async (userId) => {
  const userDoc = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDoc);
  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    return data.usesSpotify;
  } else {
    console.log("No such user");
    return null;
  }
};

export const setUsesSpotify = async (userId, status) => {
  if (status === "") return;
  try {
    const userDoc = doc(db, "users", userId);
    await setDoc(userDoc, { usesSpotify: status }, { merge: true });
    console.log("UsesSpotify updated successfully");
  } catch (e) {
    console.error("Error updating UsesSpotify: ", e);
  }
};

export const setLikeNotifications = async (userId, status) => {
  if (status === "") return;
  try {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { likeNotifications: status });
    console.log("likeNotifications updated successfully");
  } catch (e) {
    console.error("Error updating like notifications: ", e);
  }
};

export const setCommentNotifications = async (userId, status) => {
  if (status === "") return;
  try {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, { commentNotifications: status });
    console.log("commentNotifications updated successfully");
  } catch (e) {
    console.error("Error updating comment notifications: ", e);
  }
};


export const setUserAttribute = async (userId, key, value) => {
  if (key === "") return;
  try {
    const userDoc = doc(db, "users", userId);
    await setDoc(userDoc, { key: value }, { merge: true });
    console.log(`${key} updated successfully`);
  } catch (e) {
    console.error(`Error updating ${key}: `, e);
  }
};

export const getUserAttribute = async (userId, key) => {
  const userDoc = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDoc);
  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    return data.key;
  } else {
    console.log(`No such ${key}`);
    return null;
  }
};

export const addToUserPostList = async (userId, value) => {
  const docRef = doc(db, "users", userId);
  try {
    await updateDoc(docRef, {
      myPostList: arrayUnion(value),
    });
    console.log("Value appended successfully!");
  } catch (e) {
    console.error(`Error adding to postList array`, e);
  }
};

export const getAllUserPostData = async (userId) => {
  let posts = [];
  const postRef = collection(db, "post");
  const q = query(postRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let id = doc.id;
    posts[id] = doc.data();
    //console.log(doc.id, " => ", doc.data());
  });
  return posts;
};

export const getAllLikedPostData = async (userId) => {
  let postIds = [];
  const userDoc = doc(db, "users", userId);
  const userDocSnap = await getDoc(userDoc);
  if (userDocSnap.exists()) {
    const data = userDocSnap.data();
    postIds = data.likedPostList;
  } else {
    console.log("No such liked post list");
    return null;
  }
  let posts = [];
  for (let i = 0; i < postIds.length; i += 1) {
    const postDoc = doc(db, "post", postIds[i]);
    const postDocSnap = await getDoc(postDoc);
    if (postDocSnap.exists()) {
      let data = postDocSnap.data();
      posts[postIds[i]] = data;
    } else {
      console.log("No such liked post");
      return null;
    }
  }
  return posts;
};

export const getPostData = async (postId) => {
  const postDoc = doc(db, "post", postId);
  const postDocSnap = await getDoc(postDoc);
  if (postDocSnap.exists()) {
    const data = postDocSnap.data();
    return data;
  } else {
    console.log("No such post");
    return null;
  }
};

export const setDownloads = async (postId, downloads) => {
  if (postId === "") return;
  try {
    const postDoc = doc(db, "post", postId);
    await setDoc(postDoc, { downloads: downloads }, { merge: true });
    console.log("Downloads updated successfully");
  } catch (e) {
    console.error("Error updating downloads: ", e);
  }
};
