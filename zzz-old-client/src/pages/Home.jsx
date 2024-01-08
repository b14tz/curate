import PlaylistPost from "../components/PlaylistPost";
import { useState } from "react";
import Button from "@mui/material/Button";

export default function Home() {
  const [post, setPost] = useState(false);
  return (
    <div>
      <h1>Home Page</h1>
      <br></br>
      <Button variant="contained" onClick={() => setPost(true)}>
        {" "}
        Post{" "}
      </Button>
      <PlaylistPost trigger={post} setTrigger={setPost}></PlaylistPost>
    </div>
  );
}
