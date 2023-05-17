import { db } from "../config/firebase";
import {
  query,
  where,
  getDocs,
  getDoc,
  collection,
  addDoc,
  deleteDoc,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc, 
  increment,
} from "firebase/firestore";
import { sendLikeEmail } from "./emailInterface";

export const getAllLikesOfObject = async (objectId, objectType) => {
  let likes = [];
  const likeRef = collection(db, "likes");
  const q = query(
    likeRef,
    where("objectId", "==", objectId),
    where("objectType", "==", objectType)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let id = doc.id;
    likes[id] = doc.data();
  });
  return likes;
};

export const addLikeOfObject = async (objectId, objectType, userId) => {
  if (objectId === "" || objectType === "" || userId === "") return;
  try {
    await addDoc(collection(db, "likes"), {
      userId: userId,
      objectId: objectId,
      objectType: objectType,
    });
  } catch (e) {
    console.error("Error liking object: ", e);
  }

  if (objectType === "song") {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      likedSongList: arrayUnion(objectId),
    });
  } else {
    const userRef = doc(db, "users", userId);
    const author_email = await getAuthorOfPost(objectId);
    console.log(author_email);
    await updateDoc(userRef, {
      likedPostList: arrayUnion(objectId),
    });

    const postRef = doc(db, 'post', objectId)
    await updateDoc(postRef, {
        likeCount: increment(1)
    });

    //post id is object id
    //can get author from post id
    //user id is user who liked the post
    //check to see if the author has their post like notifications turned on
    let author = await getAuthor(objectId)
    if (await getLikeNotification(author)) {
      const docSnap = await getDoc(userRef);
      const userName = docSnap.data().displayName;
      await sendLikeEmail(userName, author_email, objectId.name);
    }
  }
};

//see if the users like notifications are on
export const getLikeNotification = async (userId) => {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  const likeNotif = docSnap.data().likeNotifications;
  return likeNotif;
};

//given a post id get the author
export const getAuthor = async (postId) => {
  const postRef = doc(db, "post", postId);
  const docSnap = await getDoc(postRef);
  const author = docSnap.data().userId;
  return author;
};

//get author's email of post using post ID
export const getAuthorOfPost = async (postId) => {
  // get author of post
  const author = await getAuthor(postId);

  // get author's email
  const userRef = doc(db, "users", author);
  const docSnap2 = await getDoc(userRef);
  const author_email = docSnap2.data().email;
  return author_email;
};

export const removeLikeOfObject = async (objectId, objectType, userId) => {
  if (objectId === "" || objectType === "" || userId === "") return;
  const q = query(
    collection(db, "likes"),
    where("objectId", "==", objectId),
    where("objectType", "==", objectType),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  let docId = "";
  querySnapshot.forEach((doc) => {
    docId = doc.id;
  });

  try {
    await deleteDoc(doc(db, "likes", docId));
  } catch (e) {
    console.error("Error unliking object: ", e);
  }

  if (objectType === "song") {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      likedSongList: arrayRemove(objectId),
    });
  } else {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      likedPostList: arrayRemove(objectId),
    });
    
    const postRef = doc(db, 'post', objectId)
    await updateDoc(postRef, {
        likeCount: increment(-1)
    });
  }
};

export const getIsLiked = async (objectId, objectType, userId) => {
  const q = query(
    collection(db, "likes"),
    where("objectId", "==", objectId),
    where("objectType", "==", objectType),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return false;
  } else {
    return true;
  }
};
