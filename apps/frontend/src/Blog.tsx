import "./App.css";
import { CreatePost } from "./components/CreatePost";
import { PostList } from "./components/PostList";
// import { Post } from './components/Post';
import { PostFilter } from "./components/PostFilter";
import { PostSorting } from "./components/PostSorting";

export function Blog() {
  return (
    <>
      <div>
        <CreatePost />
        <br />
        <hr />
        Filter By:
        <PostFilter field={"author"} />
        <br />
        <PostSorting fields={["createdAt", "updatedAt"]} />
        <hr />
        <PostList posts={posts} />
      </div>
    </>
  );
}
