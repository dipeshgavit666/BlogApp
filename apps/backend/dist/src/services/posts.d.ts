import type mongoose from "mongoose";
import { Document } from "mongoose";
import type { IPost } from "../db/models/post.js";
export interface CreatePostInput {
    title: string;
    author: string;
    contents: string;
    tags: string[];
}
export interface UpdatePostInput {
    title?: string;
    author?: string;
    contents?: string;
    tags?: string[];
}
type PostDocument = Document<unknown, {}, IPost, {}, any> & IPost & Required<{
    _id: string;
}> & {
    __v: number;
} & {
    id: string;
};
export declare function createPost({ title, author, contents, tags, }: CreatePostInput): Promise<PostDocument>;
export declare function listPosts(query?: {}, { sortBy, sortOrder }?: {
    sortBy?: string | undefined;
    sortOrder?: string | undefined;
}): Promise<PostDocument[]>;
export declare function listAllPosts(options?: {
    sortBy?: string;
    sortOrder?: "ascending" | "descending";
}): Promise<PostDocument[]>;
export declare function listPostsByAuthor(author: string, options?: {
    sortBy?: string;
    sortOrder?: "ascending" | "descending";
}): Promise<PostDocument[]>;
export declare function listPostsByTag(tags: string[], options?: {
    sortBy?: string;
    sortOrder?: "ascending" | "descending";
}): Promise<PostDocument[]>;
export declare function getPostByID(postId: string | mongoose.Types.ObjectId): Promise<PostDocument | null>;
export declare function updatePost(postId: string | mongoose.Types.ObjectId, { title, author, contents, tags }: UpdatePostInput): Promise<PostDocument | null>;
export declare function deletePost(postId: string | mongoose.Types.ObjectId): Promise<PostDocument | null>;
export {};
