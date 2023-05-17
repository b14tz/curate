import * as React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

export default function Comment() {
  return (
    <div>
      <div className="user-comment">
        <AccountCircleIcon className="user-icon" />
        &nbsp;
        <Link style={{ textDecoration: "none" }} to="/other-profile">
          User
        </Link>
      </div>
      <div className="hours-ago">2h ago</div>
      <div className="comment">
        This is a comment. This is a comment. This is a comment.
      </div>
    </div>
  );
}
