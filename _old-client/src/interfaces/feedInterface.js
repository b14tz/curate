import { db } from "../config/firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export const getAllPosts = async (userId) => {
  let posts = [];
  const postRef = collection(db, "post");
  const q = query(postRef, orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let id = doc.id;
    posts[id] = doc.data();
    //console.log(doc.id, " => ", doc.data());
  });
  return posts;
};

export const getPopularPosts = async () => {
  let posts = [];
  const postRef = collection(db, "post");
  const q = query(postRef, orderBy("likeCount", "desc"), limit(10));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let id = doc.id;
    posts[id] = doc.data();
    //console.log(doc.id, " => ", doc.data());
  });
  return posts;
};

export const getFollowerPosts = async (userId) => {
  let posts = [];
  let followingArray = [];

  const currentRef = doc(db, "users", userId);
  const currentSnap = await getDoc(currentRef);
  if (currentSnap.exists()) {
    followingArray = currentSnap.data().followingList;
  } else {
    console.log("Current user not found");
  }

  const postRef = collection(db, "post");
  console.log(followingArray);
  if (followingArray.length >= 1) {
    const q = query(
      postRef,
      where("userId", "in", followingArray),
      orderBy("time", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let id = doc.id;
      posts[id] = doc.data();
      //console.log(doc.id, " => ", doc.data());
    });
  }
  return posts;
};
