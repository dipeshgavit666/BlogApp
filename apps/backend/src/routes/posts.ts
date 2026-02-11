import { Post } from "../db/models/post.js";
import {
    listAllPosts,
    listPostsByAuthor,
    listPostsByTag,
    getPostByID,
    createPost,
    updatePost,
    deletePost,
} from "../services/posts.js";
import type { Application, Request, Response } from "express";

export function postsRoutes(app: Application) {
    app.get("/api/v1/posts", async (req: Request, res: Response) => {
        const { sortBy, sortOrder, author, tag } = req.query as {
            sortBy?: string;
            sortOrder?: string;
            author?: string;
            tag?: string[];
        };
        const options: {
            sortBy?: string;
            sortOrder?: "ascending" | "descending";
        } = {};
        if (sortBy) {
            options.sortBy = sortBy;
        }
        if (sortOrder === "ascending" || sortOrder === "descending") {
            options.sortOrder = sortOrder;
        }

        try {
            if (author && tag) {
                return res
                    .status(400)
                    .json({ error: "query by either author or tag, not both" });
            } else if (author) {
                return res.json(await listPostsByAuthor(author, options));
            } else if (tag) {
                return res.json(await listPostsByTag(tag, options));
            } else {
                return res.json(await listAllPosts(options));
            }
        } catch (error) {
            console.error("error listing posts", error);
            return res.status(500).end();
        }
    });

    app.get("/api/v1/posts/:id", async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "id is required" });
        }

        if (Array.isArray(id)) {
            return res.status(400).json({ error: "id must be a single value" });
        }
        try {
            const post = await getPostByID(id);
            if (post === null) return res.status(404).end();
            return res.json(post);
        } catch (error) {
            console.error("error getting post", error);
            return res.status(500).end();
        }
    });

    app.post("/api/v1/posts", async (req: Request, res: Response) => {
        try {
            const post = await createPost(req.body);
            return res.status(201).json(post);
        } catch (error) {
            console.error("error creating post", error);
            return res.status(500).end();
        }
    });

    app.patch("/api/v1/posts/:id", async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res
                    .status(400)
                    .json({ error: "id is required for updating the post" });
            }

            if (Array.isArray(id)) {
                return res.status(400).json({
                    error: "id must be a single value to update a post",
                });
            }
            const post = await updatePost(id, req.body);
            return res.status(200).json(post);
        } catch (error) {
            console.error("error updating post", error);
            return res.status(500).end();
        }
    });

    app.delete("/api/v1/posts/:id", async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res
                    .status(400)
                    .json({ error: "id is required for updating the post" });
            }

            if (Array.isArray(id)) {
                return res.status(400).json({
                    error: "id must be a single value to update a post",
                });
            }
            const post = await Post.findById(id);
            if (!post) {
                return res.status(404).json("post not found");
            }
            const deletedPost = await deletePost(id);
            if (!deletePost) {
                return res.status(404).json("post not found");
            }
            return res.status(204).end();
        } catch (error) {
            console.error("error deleting post");
            return res.status(500).end();
        }
    });
}
