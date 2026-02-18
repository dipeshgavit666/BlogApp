import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "../api/post";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [contents, setComtents] = useState("");

  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: (data: { title: string; author: string; contents: string }) =>
      createPost(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: false,
      }),
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPostMutation.mutate({ title, author, contents });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="title" className="block font-medium">
          Title:
        </label>
        <input
          type="text"
          name="title"
          required
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="contents" className="block font-medium">
          Contents:
        </label>
        <textarea
          name="contents"
          required
          className="w-full border rounded px-3 py-2"
          value={contents}
          onChange={(e) => {
            setComtents(e.target.value);
          }}
        ></textarea>
      </div>

      <div>
        <label htmlFor="author" className="block font-medium">
          Author
        </label>
        <input
          type="text"
          name="author"
          className="w-full border rounded px-3 py-2"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
        disabled={!title || createPostMutation.isPending}
      >
        {createPostMutation.isPending ? "Creating..." : "Create Post"}
      </button>
      {createPostMutation.isSuccess && (
        <p className="text-green-600">Post created successfully!</p>
      )}
    </form>
  );
}
