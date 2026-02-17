import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { CreatePost } from "./components/CreatePost";
import { PostList } from "./components/PostList";
import { PostFilter } from "./components/PostFilter";
import { PostSorting } from "./components/PostSorting";

import { getPosts } from "./api/post";

export function Blog() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  const posts = postsQuery.data ?? [];

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
