import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { getUsername } from "../../interfaces/userInterface";

export default function Notification(props) {
  const [userName, setUserName] = useState("");
  const [actionText, setActionText] = useState("");

  useEffect(() => {
    getUsername(props.userId).then((user) => {
      setUserName(user);
    });
    if (props.type === "like") {
      setActionText(" liked your post");
    }
    if (props.type === "comment") {
      setActionText(" commented on your post");
    }
    if (props.type === "follow") {
      setActionText(" followed you");
    }
  }, [props]);

  //get the time display
  function getTimeDisplay(seconds) {
    let currentDate = new Date(); //current date
    let currentSeconds = currentDate.getTime() / 1000; //current time in seconds
    let secondsAgo = Math.floor(currentSeconds - seconds); //seconds ago
    //check if it was less than a minute ago and if it is return how many seconds it's been
    if (secondsAgo < 60) {
      return `${secondsAgo} sec ago`;
    }
    //check if it was less than an hour ago and if it is return how many minutes it's been
    let minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return `${minutesAgo} min ago`;
    }
    //check if it was less than a day ago and if it is return how many hours it's been
    let hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo} hr ago`;
    }
    //check if it was less than a week ago and if it is return how many days it's been
    let daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
      return `${daysAgo} dy ago`;
    }
    //check if it was less than a month ago and if it is return how many weeks it's been
    let weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) {
      return `${weeksAgo} wk ago`;
    }
    //check if it was less than a year ago and if it is return how many months it's been
    let monthsAgo = Math.floor(weeksAgo / 4);
    return `${monthsAgo} mo ago`;
  }

  return (
    <Container sx={{ display: "flex", alignItems: "right" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Container
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Link
            to={`/user/${props.userId}`}
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AccountCircleIcon color="primary" sx={{ fontSize: "3rem" }} />
            <Typography variant="h6">{userName}</Typography>
          </Link>
          <Typography variant="h6" sx={{ ml: "5px" }}>
            {actionText}
          </Typography>
        </Container>
        <Typography variant="h6" sx={{ width: "200px" }}>
          {getTimeDisplay(props.time.seconds)}
        </Typography>
      </Box>
    </Container>
  );
}
