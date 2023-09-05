import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  where,
  query,
  orderBy,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { sendCommentEmail } from "./emailInterface";
import { getAuthorOfPost, getAuthor } from "./likeInterface";

//add comment to database
export const createComment = async (userId, postId, content) => {
  if (postId === "") return;
  try {
    const timeCreated = await Timestamp.fromDate(new Date());
    const docRef = await addDoc(collection(db, "comments"), {
      userId: userId,
      postId: postId,
      content: content,
      ts: timeCreated,
    });
    console.log("Comment writent to comment id: ", docRef.id);
    const postsRef = doc(db, "post", postId);
    const author_email = await getAuthorOfPost(postId);
    console.log(author_email);

    // get authors display name
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    const userName = docSnap.data().displayName;

    // get post title
    const postRef = doc(db, "post", postId);
    const postSnap = await getDoc(postRef);
    const postTitle = postSnap.data().title;

    //see if the author has their post comment notifications turned on
    let author = await getAuthor(postId);
    if (await getCommentNotification(author)) {
      await sendCommentEmail(userName, author_email, postTitle, content);
    }
    await updateDoc(postsRef, {
      commentsList: arrayUnion(docRef.id),
    });
  } catch (e) {
    console.error("Error updating comments: ", e);
  }
  window.location.reload();
};

//see if the user's comment notifications are on
export const getCommentNotification = async (userId) => {
  const userRef = doc(db, "users", userId);
  const docSnap = await getDoc(userRef);
  const commentNotif = docSnap.data().commentNotifications;
  return commentNotif;
};

export const getPostComments = async (postId) => {
  let comments = [];
  const commentRef = collection(db, "comments");
  const q = query(
    commentRef,
    where("postId", "==", postId),
    orderBy("ts", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let id = doc.id;
    comments[id] = doc.data();
    // console.log(doc.id, " => ", doc.data());
  });
  return comments;
};
