import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";
import Login from "../elements/login.js";
import NavBar from "../elements/navbar.js";
import NewPost from "../elements/newPost.js";
import PostList from "../elements/postList.js";

export default function Main() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <NavBar />
      {!user ? (
        <Login />
      ) : (
        <div>
          <NewPost />
          <PostList />
        </div>
      )}
    </div>
  );
}
