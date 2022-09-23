import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Login from "../components/login.component";
import NavBar from "../components/navbar.component";
import NewPost from "../components/newPost.component";
import PostList from "../components/postList.component";

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
