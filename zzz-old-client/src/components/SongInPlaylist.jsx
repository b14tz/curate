import * as React from "react";
import albumArt from "./images/AlbumArt.jpeg";
import { Link } from "react-router-dom";

export default function PageImage() {
  return (
    <div>
      <div className="album-art">
        <img src={albumArt} alt="Album" />
      </div>
      <div className="album-title">
        <Link style={{ textDecoration: "none" }} to="/song/1">
          Song Name
        </Link>
      </div>
      <div className="album-artist">
        by &nbsp;
        <Link style={{ textDecoration: "none" }} to="/artist/1">
          someone
        </Link>
      </div>
    </div>
  );
}
