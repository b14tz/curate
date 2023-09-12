import {
  Box,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Typography,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import LayeredCoverArt from "./LayeredCoverArt";
import PostStats from "./PostStats";
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

export default function PlaylistTable(props) {
  //create a function to get the time since the post was made
  function getTimeDisplay(seconds) {
    //get the current date
    let currentDate = new Date();
    //get the current date in seconds
    let currentSeconds = currentDate.getTime() / 1000;
    //get the seconds since the post was made
    let secondsAgo = Math.floor(currentSeconds - seconds);
    //if the post was made less than a minute ago return the seconds since the post was made
    if (secondsAgo < 60) {
      return `${secondsAgo} sec ago`;
    }
    //if the post was made less than an hour ago return the minutes since the post was made
    let minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
      return `${minutesAgo} min ago`;
    }
    //if the post was made less than a day ago return the hours since the post was made
    let hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
      return `${hoursAgo} hr ago`;
    }
    //if the post was made less than a week ago return the days since the post was made
    let daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) {
      return `${daysAgo} dy ago`;
    }
    //if the post was made less than a month ago return the weeks since the post was made
    let weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) {
      return `${weeksAgo} wk ago`;
    }
    //if the post was made less than a year ago return the months since the post was made
    let monthsAgo = Math.floor(weeksAgo / 4);
    return `${monthsAgo} mo ago`;
  }
  const renderPlaylists = () => {
    //console.log(props.postData[0]);
    return Object.keys(props.postData).map((key) => (
      <TableRow
        key={key}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          overflow: "visible !important",
        }}
      >
        <TableCell
          component="th"
          scope="row"
          sx={{ overflow: "visible !important" }}
        >
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
              <LayeredCoverArt
                sx={{ width: "fit-content" }}
                postData={props.postData[key]}
              />
            </Box>
            <Box>
              <TitleBox>
                <Link
                  to={`/playlist/${key}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography sx={{ color: "primary.main", fontSize: "3rem" }}>
                    {props.postData[key]["title"]}
                  </Typography>
                </Link>
              </TitleBox>
              <PostStats
                postId={key}
                likes={props.postData[key]["likesList"].length}
                userId={props.postData[key]["userId"]}
                comments={props.postData[key]["commentsList"].length}
                time={getTimeDisplay(props.postData[key].time.seconds)}
                page=""
              />
              <DescriptionBox sx={{ fontSize: "1.5rem" }}>
                {props.postData[key]["description"]}
              </DescriptionBox>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Stack>
      <TableContainer>
        <Table sx={{}}>
          <TableBody>{renderPlaylists()}</TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
