import React from "react";
import { Box } from "@mui/system";
import PostStats from "../Playlist/PostStats";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LayeredCoverArt from "../Playlist/LayeredCoverArt";
import styled from "styled-components";

const DescriptionBox = styled(Box)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TitleBox = styled(Box)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default function ListSearch(props) {
  const post = props.post;
  const keyVal = props.keyVal;

  function getTimeDisplay(seconds) {
    let currentDate = new Date();
    let currentSeconds = currentDate.getTime() / 1000;
    let secondsAgo = Math.floor(currentSeconds - seconds);
    if (secondsAgo < 60) {
      return `${secondsAgo} sec ago`;
    }
    let minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return `${minutesAgo} min ago`;
    }
    let hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo} hr ago`;
    }
    let daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
      return `${daysAgo} dy ago`;
    }
    let weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) {
      return `${weeksAgo} wk ago`;
    }
    let monthsAgo = Math.floor(weeksAgo / 4);
    return `${monthsAgo} mo ago`;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "210px",
        mt: "20px",
        justifyContent: "start",
        maxWidth: "1300px",
      }}
    >
      <Box sx={{ width: "400px" }}>
        <LayeredCoverArt sx={{ width: "fit-content" }} postData={post} />
      </Box>
      <Box>
        <TitleBox>
          <Link to={`/playlist/${keyVal}`} style={{ textDecoration: "none" }}>
            <Typography sx={{ color: "primary.main", fontSize: "3rem" }}>
              {post.title}
            </Typography>
          </Link>
        </TitleBox>
        <PostStats
          postId={keyVal}
          likes={post.likesList.length}
          userId={post.userId}
          comments={post.commentsList.length}
          time={getTimeDisplay(post.time.seconds)}
          page=""
        />
        <DescriptionBox sx={{ fontSize: "1.5rem" }}>
          {post.description}
        </DescriptionBox>
      </Box>
    </Box>
  );
}
