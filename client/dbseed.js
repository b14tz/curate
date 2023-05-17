const admin = require('firebase-admin'); // required
const {faker} = require('@faker-js/faker'); // faker gives filler input for sample data

// initialization
const projectId = 'sep-team1';
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

// Initialize Firebase Admin SDK
const serviceAccount = require('../sep-team1-firebase-adminsdk-e89tf-6a718170cd.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const auth = admin.auth()
auth.useEmulator('localhost', 9099)
const db = admin.firestore();

// seed function
function getSeedData() {
  try {
    [...Array(10).keys()].map(() =>
      db.collection('users').add({
        displayName: faker.internet.userName(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        spotifyAuthToken: "",
        isPublic: faker.datatype.boolean(),
        followers: {
            0: faker.random.alphaNumeric(8),
            1: faker.random.alphaNumeric(8),
            2: faker.random.alphaNumeric(8),
        },
        following: {
            0: faker.random.alphaNumeric(8),
            1: faker.random.alphaNumeric(8),
            2: faker.random.alphaNumeric(8),
        },
        likedSongs: {
            0: faker.random.alphaNumeric(8),
            1: faker.random.alphaNumeric(8),
            2: faker.random.alphaNumeric(8),
        },
        likedAlbums: {
            0: faker.random.alphaNumeric(8),
            1: faker.random.alphaNumeric(8),
            2: faker.random.alphaNumeric(8),
        },
        likedArtists: {
            0: faker.random.alphaNumeric(8),
            1: faker.random.alphaNumeric(8),
            2: faker.random.alphaNumeric(8),
        },
        pendingFollowRequests: {
            0: faker.random.alphaNumeric(8),
            1: faker.random.alphaNumeric(8),
            2: faker.random.alphaNumeric(8),
        },
        blockedUsers: {
            0: faker.random.alphaNumeric(8),
            1: faker.random.alphaNumeric(8),
            2: faker.random.alphaNumeric(8),
        },
        notificationSettings: {
            emailLikes: faker.datatype.boolean(),
            emailComments: faker.datatype.boolean(),
            emailSaves: faker.datatype.boolean(),
            textLikes: faker.datatype.boolean(),
            textComments: faker.datatype.boolean(),
            textSaves: faker.datatype.boolean(),
        }
      }),
    );
    console.log('user seed was successful');
  } catch (error) {
    console.log(error, 'user seed failed');
  }


  try {
    [...Array(10).keys()].map(() =>    
        db.collection('playlist').add({
            description: faker.lorem.sentence(),
            coverArt: faker.image.imageUrl(),
            songs: {
                0: faker.random.alphaNumeric(8),
                1: faker.random.alphaNumeric(8),
                2: faker.random.alphaNumeric(8),
            },
        })
    );
    console.log('playlist seed was successful');
  } catch (error) {
    console.log(error, 'playlist seed failed');
  }


  try {
    [...Array(10).keys()].map(() =>    
        db.collection('post').add({
            timeStamp: faker.datatype.datetime(),
            userId: faker.random.alphaNumeric(8),
            likes: {
                0: faker.random.alphaNumeric(8),
                1: faker.random.alphaNumeric(8),
                2: faker.random.alphaNumeric(8),
            },
            comments: {
                0: faker.random.alphaNumeric(8),
                1: faker.random.alphaNumeric(8),
                2: faker.random.alphaNumeric(8),
            },
            numberOfSaves: faker.datatype.bigInt(100n),
            playlistId: faker.random.alphaNumeric(8),
        }),
    );
    console.log('post seed was successful');
  } catch (error) {
    console.log(error, 'post seed failed');
  }

  try {
    [...Array(10).keys()].map(() =>    
        db.collection('comment').add({
            timeStamp: faker.datatype.datetime(),
            userId: faker.random.alphaNumeric(8),
            content: faker.lorem.sentence(),
        })
    );
    console.log('comment seed was successful');
  } catch (error) {
    console.log(error, 'comment seed failed');
  }

  try {
    [...Array(10).keys()].map(() =>    
        db.collection('artist').add({
            spotifyId: faker.random.alphaNumeric(8),
            likes: faker.datatype.bigInt(100n),
        })
    );
    console.log('artist seed was successful');
  } catch (error) {
    console.log(error, 'artist seed failed');
  }

  try {
    [...Array(10).keys()].map(() =>    
        db.collection('song').add({
            spotifyId: faker.random.alphaNumeric(8),
            likes: faker.datatype.bigInt(100n),
            title: faker.music.songName(),
            artistId: faker.random.alphaNumeric(8),
        })
    );
    console.log('song seed was successful');
  } catch (error) {
    console.log(error, 'song seed failed');
  }

  try {
    [...Array(10).keys()].map(() =>    
        db.collection('album').add({
            spotifyId: faker.random.alphaNumeric(8),
            likes: faker.datatype.bigInt(100n),
            title: faker.music.songName(),
            artistId: faker.random.alphaNumeric(8),
            songs: {
                0: faker.random.alphaNumeric(8),
                1: faker.random.alphaNumeric(8),
                2: faker.random.alphaNumeric(8),
            }
        })
    );
    console.log('album seed was successful');
  } catch (error) {
    console.log(error, 'album seed failed');
  }
}

async function createAndAddUser(firstName, lastName, userName, email, password){
  const fakeUser = {
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    email: email
  };

  // Add fake user to Firestore collection
  db.collection('users').add(fakeUser)
    .then(docRef => {
      console.log(`Added fake user with UID: ${docRef.id}`);
      
      // Set password for fake user
      auth.createUser({
        email: email,
        password: "123456",
        uid: docRef.id
      })
      .then(() => {
        console.log(`Set password for fake user`)
      })
      .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}

createAndAddUser("joe", "johnson", "jjohnson", "jj@gmail.com", "joe123");
//getSeedData();