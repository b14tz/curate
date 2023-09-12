import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  where,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

//add comment to database
export const createNotification = async (
  userId,
  objectId,
  objectType,
  recipientId
) => {
  if (objectId === "") return;
  try {
    const timeCreated = await Timestamp.fromDate(new Date());
    const docRef = await addDoc(collection(db, "notifications"), {
      userId: userId,
      objectId: objectId,
      objectType: objectType,
      recipientId: recipientId,
      ts: timeCreated,
    });
    console.log("Notification written to notification id: ", docRef.id);
  } catch (e) {
    console.error("Error updating notifications: ", e);
  }
};

export const getUserNotifications = async (recipientId) => {
  let notifications = [];
  const notiRef = collection(db, "notifications");
  const q = query(
    notiRef,
    where("recipientId", "==", recipientId),
    orderBy("ts", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let id = doc.id;
    notifications[id] = doc.data();
    // console.log(doc.id, " => ", doc.data());
  });
  return notifications;
};
