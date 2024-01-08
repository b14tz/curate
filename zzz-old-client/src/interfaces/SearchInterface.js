import { db } from "../config/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

// function will create the search terms for a string. This can be used to create the search terms of whatever we store
export const createSearchTerms = async (term) => {
  var searchTerms = [];
  var currentTerm = "";
  searchTerms.push(currentTerm);
  for (let i = 0; i < term.length; i++) {
    currentTerm = currentTerm + term.charAt(i);
    searchTerms.push(currentTerm);
  }
  return searchTerms;
};

// search for all
export const searchAll = async (term) => {
  let results = [];
  // references to firestore for users, lists, and tags
  const userRef = collection(db, "users");
  const listRef = collection(db, "lists");
  const tagRef = collection(db, "tags");

  // queries to firestore for users, lists, and tags
  const u = query(userRef, where("searchTerms", "array-contains", term));
  const l = query(listRef, where("searchTerms", "array-contains", term));
  const t = query(tagRef, where("searchTerms", "array-contains", term));

  // api calls for songs, artists, and albums

  // combine all results into results array
  const userSnapshot = await getDocs(u);
  userSnapshot.forEach((doc) => {
    results.push(doc.data());
  });

  const listSnapshot = await getDocs(l);
  listSnapshot.forEach((doc) => {
    results.push(doc.data());
  });

  const tagSnapshot = await getDocs(t);
  tagSnapshot.forEach((doc) => {
    results.push(doc.data());
  });

  return results.sort(function (s1, s2) {
    let string1 = "";
    let string2 = "";

    if (s1.displayName !== undefined) string1 = s1.displayName;
    if (s1.playlistName !== undefined) string1 = s1.playlistName;
    if (s1.tagName !== undefined) string1 = s1.tagName;
    if (s2.displayName !== undefined) string2 = s2.displayName;
    if (s2.playlistName !== undefined) string2 = s2.playlistName;
    if (s2.tagName !== undefined) string2 = s2.tagName;

    return string1.length - string2.length;
  });
};

// search for lists
export const searchPosts = async (term) => {
  let posts = [];
  const postRef = collection(db, "post");
  const q = query(
    postRef,
    where("searchTerms", "array-contains", term),
    orderBy("time", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let id = doc.id;
    posts[id] = doc.data();
    //console.log(doc.id, " => ", doc.data());
  });
  // sort the array by length to get closest results to searchTerm and return
  return posts.sort(function (s1, s2) {
    return s1.title.length - s2.title.length;
  });
};

// search for users
export const searchUsers = async (term) => {
  // results array
  let results = [];
  // reference to collection
  const ref = collection(db, "users");
  // query
  const q = query(ref, where("searchTerms", "array-contains", term));
  // get snapshot of results. Append data to results array
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    results.push([doc.id, doc.data()]);
  });
  // sort the array by length to get closest results to searchTerm and return
  return results.sort(function (s1, s2) {
    return s1[1].displayName.length - s2[1].displayName.length;
  });
};

export const searchTags = async (term) => {
  let posts = [];
  const postRef = collection(db, "post");
  const q = query(postRef, where("tags", "array-contains", term));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let id = doc.id;
    posts[id] = doc.data();
  });
  // sort the array by length to get closest results to searchTerm and return
  return posts.sort(function (s1, s2) {
    return s1.likeslist.length - s2.likeslist.length;
  });
};
