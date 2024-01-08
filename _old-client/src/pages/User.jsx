import React from "react";
import { Box } from "@mui/system";
import { auth } from "../config/firebase";
import MyProfile from "../components/User/MyProfile";
import OtherProfile from "../components/User/OtherProfile";
import { useParams } from "react-router-dom";

export default function User() {
  //userId is pulled from the url using useParams
  const { userId } = useParams();
  const myUserId = auth.currentUser.uid;

  return (
    <Box>
      {myUserId === userId ? (
        <Box>
          <MyProfile userId={userId} />
        </Box>
      ) : (
        <Box>
          <OtherProfile userId={userId} />
        </Box>
      )}
    </Box>
  );
}
