import type mongoose from "mongoose";
import { Document } from "mongoose";
import { Post } from "../db/models/post.js";
import type { IPost } from "../db/models/post.js";

export interface CreatePostInput {
  title: string;
  author?: string;
  contents: string;
  tags?: string[];
}

export interface UpdatePostInput {
  title?: string;
  author?: string;
  contents?: string;
  tags?: string[];
}

type postInput = Pick<IPost, "title" | "author" | "contents" | "tags">;
type PostDocument = Document<unknown, {}, IPost, {}, any> &
  IPost &
  Required<{ _id: string }> & { __v: number } & { id: string };

export async function createPost({
  title,
  author,
  contents,
  tags,
}: CreatePostInput): Promise<PostDocument> {
  const post = new Post({ title, author, contents, tags });
  return await post.save();
}

export async function listPosts(
  query = {},
  { sortBy = "createdAt", sortOrder = "descending" } = {},
): Promise<PostDocument[]> {
  const sortDirection = sortOrder === "descending" ? -1 : 1;
  const sortObj: Record<string, 1 | -1> = { [sortBy]: sortDirection };
  return await Post.find(query).sort(sortObj);
}

export async function listAllPosts(
  options: { sortBy?: string; sortOrder?: "ascending" | "descending" } = {},
): Promise<PostDocument[]> {
  return await listPosts({}, options);
}

export async function listPostsByAuthor(
  author: string,
  options: { sortBy?: string; sortOrder?: "ascending" | "descending" } = {},
): Promise<PostDocument[]> {
  return await listPosts({ author }, options);
}

export async function listPostsByTag(
  tags: string[],
  options: { sortBy?: string; sortOrder?: "ascending" | "descending" } = {},
): Promise<PostDocument[]> {
  return await listPosts({ tags }, options);
}

export async function getPostByID(
  postId: string | mongoose.Types.ObjectId,
): Promise<PostDocument | null> {
  return await Post.findById(postId);
}

export async function updatePost(
  postId: string | mongoose.Types.ObjectId,
  { title, author, contents, tags }: UpdatePostInput,
): Promise<PostDocument | null> {
  return await Post.findByIdAndUpdate(
    { _id: postId },
    { $set: { title, author, contents, tags } },
    { new: true },
  );
}

export async function deletePost(
  postId: string | mongoose.Types.ObjectId,
): Promise<PostDocument | null> {
  return await Post.findByIdAndDelete(postId);
}
