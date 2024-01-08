import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { createComment } from "../../interfaces/commentInterface";
import { auth } from "../../config/firebase";
import { createNotification } from "../../interfaces/notificationsInterface";

export default function WriteComment(props) {
  //create a state variable to hold the user's comment and if an error occurs
  const [userComment, setUserComment] = useState("");
  const [commentError, setCommentError] = useState("");

  //function to handle the user's comment
  const handleComment = async () => {
    setCommentError("");
    //check if the user's comment is empty and if so, set an error
    if (userComment === "") {
      setCommentError("The comment cannot be empty");
      return;
    }
    //create the comment
    await createComment(auth.currentUser.uid, props.postId, userComment);
    await createNotification(
      auth.currentUser.uid,
      props.postId,
      "comment",
      props.authorId
    );
    //reload the page
    //window.location.reload()
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
      {commentError !== "" ? (
        <TextField
          error
          helperText={commentError}
          fullWidth
          id="comment-box"
          label="Write your thoughts here..."
          multiline
          rows={4}
          sx={{ my: "7.5px" }}
          onChange={(e) => setUserComment(e.target.value)}
        />
      ) : (
        <TextField
          fullWidth
          id="comment-box"
          label="Write your thoughts here..."
          multiline
          rows={4}
          sx={{ my: "7.5px" }}
          onChange={(e) => setUserComment(e.target.value)}
        />
      )}
      <Button
        onClick={() => handleComment()}
        variant="contained"
        sx={{ width: "fit-content" }}
      >
        Comment
      </Button>
    </Box>
  );
}
