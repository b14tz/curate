import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Notification from "./Notification";
import { Box } from "@mui/material";
import { getUserNotifications } from "../../interfaces/notificationsInterface";
import { auth } from "../../config/firebase";

//create the table
export default function NotificationsTable() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getUserNotifications(auth.currentUser.uid).then((data) => {
      setNotifications(data);
    });
  }, []);

  const renderNotifications = () => {
    return Object.values(notifications).map((noti) => (
      <TableRow
        key={noti.ts}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Notification
            userId={noti.userId}
            type={noti.objectType}
            recipientId={noti.recipientId}
            time={noti.ts}
          />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 650 }} aria-label="Notifications">
        <TableBody key="notificationsTable">{renderNotifications()}</TableBody>
      </Table>
    </TableContainer>
  );
}
