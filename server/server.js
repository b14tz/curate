// need express imported to setup backend
require('dotenv').config();
const express = require("express");
const app = express();
const test = require("./routes/test");
const port = 8001
const queryString = require("node:querystring");
const axios = require("axios");
const cors = require("cors");

// set up cors middle ware
app.use(cors());

let access_token = null


// STUFF FOR APPLE AUTH
const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync('apple_private_key.p8').toString();
const teamId = process.env.APPLE_TEAM_ID;
const keyId = process.env.APPLE_KEY_ID;

// create apple developer token
const apple_jwt = jwt.sign({}, privateKey, {
    algorithm: 'ES256',
    expiresIn: '180d',
    issuer: teamId,
    header: {
        alg: 'ES256',
        kid: keyId
    }
});

// send apple developer token to frontend
app.get('/apple-token', function (req, res) {
    console.log("sending apple token")
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ token: apple_jwt }));
});
// END STUFF FOR APPLE AUTH

app.use("/api/test", test);


app.get("/api", (req, res) => {
  res.send("Hello World! -- Express");
});


app.get("/account", async (req, res) => {
  const spotifyResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      queryString.stringify({
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: process.env.SPOTIFY_DECODED_REDIRECT_URL,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET_ID
      })
    );

    console.log(spotifyResponse.data)
    res.send(spotifyResponse.data)


  // console.log(req.query.code)
  // res.send("account page");
})






// const data = await axios.get(
//   "https://api.spotify.com/v1/me/top/tracks?limit=50",
//   {
//     headers: {
//       Authorization: "Bearer " + access_token,
//     },
//   }
// );

// console.log(data)



app.listen(port, () => console.log(`Server listening on port ${port}!`));
