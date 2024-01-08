import emailjs from "@emailjs/browser";

export const sendLikeEmail = async (liker_username, to_email, playlistName) => {
  const action = "liked";
  var params = {
    action: action,
    user_email: to_email,
    username: liker_username,
    playlist_name: playlistName,
  };

  emailjs
    .send("service_11mrsvl", "template_fnjjc0g", params, "PpiofOmq8pdCm0rXw")
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
};

export const sendCommentEmail = async (
  commenter_username,
  to_email,
  playlistName,
  comment
) => {
  var params = {
    comment: comment,
    to_email: to_email,
    commenter_username: commenter_username,
    playlist_name: playlistName,
  };

  emailjs
    .send("service_11mrsvl", "template_yap3g2q", params, "PpiofOmq8pdCm0rXw")
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
};

// export const sendSaveEmail = (saver_username, to_email, playlistName) => {

//     const action = "saved";

//     var params = {
//         action: action,
//         user_email: to_email,
//         username: saver_username,
//         playlist_name: playlistName
//     };

//       emailjs.send('service_11mrsvl', 'template_fnjjc0g', params, 'PpiofOmq8pdCm0rXw')
//         .then((result) => {
//             console.log(result.text);
//         }, (error) => {
//             console.log(error.text);
//         });
// }
