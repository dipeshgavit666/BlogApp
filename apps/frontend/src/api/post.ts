export const getPosts = async (queryParams: Record<string, string> = {}) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  );
  return await res.json();
};

export interface IPost {
  title: string;
  author?: string | undefined;
  contents: string;
  tags?: string[] | undefined;
}

export const createPost = async (post: IPost) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return await res.json();
};

export const updatePost = async (id: string, post: Partial<IPost>) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const deletePost = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(await res.text());
};
