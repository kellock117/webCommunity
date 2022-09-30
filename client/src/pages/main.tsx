import NavBar from "../components/navbar.component";
import NewPost from "../components/newPost.component";
import PostList from "../components/postList.component";

export default function Main() {
  return (
    <div>
      <NavBar />
      <NewPost />
      <PostList />
    </div>
  );
}
