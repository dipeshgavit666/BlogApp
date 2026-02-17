import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CreatePost } from "./components/CreatePost";
import { PostList } from "./components/PostList";
import { PostFilter } from "./components/PostFilter";
import { PostSorting } from "./components/PostSorting";

import { getPosts } from "./api/post";

export function Blog() {
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");

  const postsQuery = useQuery({
    queryKey: ["posts", { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  });

  const posts = postsQuery.data ?? [];

  return (
    <>
      <div>
        <CreatePost />
        <br />
        <hr />
        Filter By:
        <PostFilter
          field="author"
          value={author}
          onChange={(value: string) => setAuthor(value)}
        />
        <br />
        <PostSorting
          fields={["createdAt", "updatedAt"]}
          value={sortBy}
          onChange={(value: string) => setSortBy(value)}
          orderValue={sortOrder}
          onOrderChange={(orderValue: string) => setSortOrder(orderValue)}
        />
        <hr />
        <PostList posts={posts} />
      </div>
    </>
  );
}
