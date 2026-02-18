import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updatePost, deletePost } from "../api/post";
import { Post } from "./Post";

export type postEntity = {
  _id: string;
  title: string;
  contents: string;
  author?: string;
};

type postListProps = {
  posts?: postEntity[];
};

export function PostList({ posts = [] }: postListProps) {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: false }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { title: string; contents: string; author?: string | undefined };
    }) => updatePost(id, data),
    onSuccess: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
    },
  });

  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className="post-item">
          {editingId === post._id ? (
            <EditPostForm
              post={post}
              onSave={(data) => updateMutation.mutate({ id: post._id, data })}
              onCancel={() => setEditingId(null)}
              isPending={updateMutation.isPending}
            />
          ) : (
            <>
              <Post
                title={post.title}
                contents={post.contents}
                author={post.author}
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingId(post._id)}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteMutation.mutate(post._id)}
                  disabled={deleteMutation.isPending}
                  className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </>
          )}
          <hr />
        </div>
      ))}
    </>
  );
}

type EditPostFormProps = {
  post: postEntity;
  onSave: (data: {
    title: string;
    contents: string;
    author?: string | undefined;
  }) => void;
  onCancel: () => void;
  isPending: boolean;
};

function EditPostForm({
  post,
  onSave,
  onCancel,
  isPending,
}: EditPostFormProps) {
  const [title, setTitle] = useState(post.title);
  const [contents, setContents] = useState(post.contents);
  const [author, setAuthor] = useState(post.author ?? "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ title, contents, author: author || undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <div>
        <label className="block font-medium text-sm">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
          required
        />
      </div>
      <div>
        <label className="block font-medium text-sm">Contents</label>
        <textarea
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
          required
        />
      </div>
      <div>
        <label className="block font-medium text-sm">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!title || !contents || isPending}
          className="bg-black text-white px-3 py-1 rounded text-sm"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
