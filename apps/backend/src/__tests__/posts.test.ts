import mongoose, { Document, type DefaultSchemaOptions } from "mongoose";
import { describe, expect, test, beforeEach } from "@jest/globals";
import {
    createPost,
    listAllPosts,
    listPostsByAuthor,
    listPostsByTag,
    getPostByID,
    updatePost,
    deletePost,
} from "../services/posts.js";
import { Post, type IPost } from "../db/models/post.js";

describe("creating posts", () => {
    test("with all parameters should succeed", async () => {
        const post = {
            title: "Hello",
            author: "Dipes Gavit",
            contents: "This is my first blog post",
            tags: ["mongoose", "mongoDB"],
        };
        const createdPost = await createPost(post);
        expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
        const foundPost = await Post.findById(createdPost._id);
        expect(foundPost).toBeDefined();
        expect(foundPost).toEqual(expect.objectContaining(post));
        expect(foundPost!.createdAt).toBeInstanceOf(Date);
        expect(foundPost!.updatedAt).toBeInstanceOf(Date);
    });

    test("without title should fail", async () => {
        const post = {
            author: "Dipesh Gvait",
            contents: "Post with no title",
            tags: ["empty"],
        } as any;
        try {
            await createPost(post);
            throw new Error("Should have thrown ValidationError");
        } catch (err) {
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
            const validationError = err as mongoose.Error.ValidationError;
            expect(validationError.errors.title).toBeDefined();
            expect(validationError.errors.title?.message).toContain(
                "Title is required",
            );
        }
    });

    test("without contents should fail", async () => {
        const post = {
            title: "this is a title",
            author: "Dipesh Gvait",
            tags: ["empty"],
        } as any;
        try {
            await createPost(post);
            throw new Error("Should have thrown ValidationError");
        } catch (err) {
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
            const validationError = err as mongoose.Error.ValidationError;
            expect(validationError.errors.contents).toBeDefined();
            expect(validationError.errors.contents!.message).toContain(
                "Blog content is required",
            );
        }
    });

    test("with minimal parameters should succeed", async () => {
        const post = {
            title: "This is title which is",
            contents: "this is content which is also required",
        } as any;
        const createdPost = await createPost(post);
        expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
    });
});

//sample posts:
const samplePosts = [
    {
        title: "Learning Redux",
        author: "Dipesh Gavit",
        contents: "i am learning Redux",
        tags: ["redux"],
    },
    {
        title: "Learning React Hooks",
        author: "Dipesh Gavit",
        contents: "I am learning React Hooks",
        tags: ["react"],
    },
    {
        title: "MERN stack project giud",
        author: "Dipesh Gavit",
        contents:
            "This is th efull and simple guied for MERN stack CRUD web app",
        tags: ["react", "node", "mongodb", "express"],
    },
];

type PostDocument = Document<unknown, {}, IPost, {}, DefaultSchemaOptions> &
    IPost &
    Required<{ _id: string }> & { __v: number } & { id: string };

let createdSamplePosts: PostDocument[] = [];

beforeEach(async () => {
    await Post.deleteMany({});
    createdSamplePosts.length = 0;
    for (const post of samplePosts) {
        const createdPost = new Post(post);
        createdSamplePosts.push(await createdPost.save());
    }
});

describe("getting a post", () => {
    test("Should return the full post", async () => {
        expect(createdSamplePosts.length).toBeGreaterThan(0);
        const firstPost = createdSamplePosts[0]!;
        const post = await getPostByID(firstPost._id);
        expect(post).toBeDefined();
        expect(post!.toObject()).toEqual(firstPost.toObject());
    });
    test("Should fail if the id does not exist", async () => {
        const post = await getPostByID("000000000000000000000000");
        expect(post).toEqual(null);
    });
});

describe("updating posts", () => {
    test("Should update the specified property", async () => {
        const firstPost = createdSamplePosts[0]!;
        await updatePost(firstPost._id, {
            author: "Test Author",
        });
        const updatedPost = await Post.findById(firstPost._id);
        expect(updatedPost).toBeDefined();
        expect(updatedPost!.author).toEqual("Test Author");
    });
    test("should not updated other properties", async () => {
        const firstPost = createdSamplePosts[0]!;
        await updatePost(firstPost._id, {
            author: "Test Author",
        });
        const updatedPost = await Post.findById(firstPost._id);
        expect(updatedPost).toBeDefined();
        expect(updatedPost!.title).toEqual("Learning Redux");
    });
    test("Should update updatedAt timestamp", async () => {
        const firstPost = createdSamplePosts[0]!;
        await updatePost(firstPost._id, {
            author: "Test Author",
        });
        const updatedPost = await Post.findById(firstPost._id);
        expect(updatedPost).toBeDefined();
        expect(updatedPost!.updatedAt.getTime()).toBeGreaterThan(
            firstPost.updatedAt.getTime(),
        );
    });
    test("should fail if id does not exist", async () => {
        const post = await updatePost("000000000000000000000000", {
            author: "Test Author",
        });
        expect(post).toEqual(null);
    });
});

describe("deleteing posts", () => {
    test("Should remove the post from the database", async () => {
        const firstPost = createdSamplePosts[0]!;
        const result = await deletePost(firstPost._id);
        expect(result).toBeDefined();
        const deletedPost = await Post.findById(firstPost._id);
        expect(deletedPost).toEqual(null);
    });
});
