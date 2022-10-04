import NavBar from "../components/others/navbar.component";
import NewPost from "../components/post/newPost.component";
import PostList from "../components/post/postList.component";

export default function Main() {
  return (
    <div>
      <NavBar />
      <NewPost />
      <PostList />
    </div>
  );
}
