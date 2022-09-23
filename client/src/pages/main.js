import { useContext } from "react";
import { AuthContext } from "../context/authContext.js";
import Login from "../components/login.component.js";
import NavBar from "../components/navbar.component.js";
import NewPost from "../components/newPost.component.js";
import PostList from "../components/postList.component.js";

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
