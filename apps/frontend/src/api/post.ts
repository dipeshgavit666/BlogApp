export const getPosts = async (queryParams: Record<string, string> = {}) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  );
  return await res.json();
};

export interface IPost {
  title: string;
  author?: string;
  contents: string;
  tags?: string[];
}

export const createPost = async (post: IPost) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return await res.json();
};
