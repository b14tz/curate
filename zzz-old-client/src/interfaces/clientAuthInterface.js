import { getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { collection, query, where } from "firebase/firestore";
import axios from "axios";
import { Buffer } from "buffer";
import * as qs from "qs";

var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
var client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET_ID;

const auth_token = Buffer.from(`${client_id}:${client_secret}`).toString(
  "base64"
);

export const createClientToken = async () => {
  try {
    //make post request to SPOTIFY API for access token, sending relavent info
    const token_url = "https://accounts.spotify.com/api/token";
    const data = qs.stringify({ grant_type: "client_credentials" });

    const response = await axios.post(token_url, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${auth_token}`,
      },
      json: true,
    });
    //return access token
    return response.data.access_token;
  } catch (error) {
    //on fail, log the error in console
    console.log(error);
  }
};

const updateToken = async (token) => {
  var timestamp = new Date();
  await setDoc(doc(db, "clientToken", "1"), {
    id: "1",
    token: token,
    ts: timestamp.getTime(),
  });
};

export const getClientToken = async () => {
  const clientRef = collection(db, "clientToken");
  const clientQuery = query(clientRef, where("id", "==", "1"));

  const snapshot = await getDocs(clientQuery);
  var token;
  var timestamp;
  var currentTime = new Date();
  if (!snapshot.empty) {
    var data;
    snapshot.forEach((doc) => {
      data = doc.data();
    });
    token = data.token;
    timestamp = data.ts;
  } else {
    token = null;
  }

  // check if token is an hour old or null
  if (token === null || currentTime.getTime() - timestamp > 3240000) {
    token = await createClientToken();
    updateToken(token);
  }
  return token;
};
