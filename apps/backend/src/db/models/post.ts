import { Schema, model } from "mongoose";

export interface IPost {
    _id: string;
    title: string;
    author?: string;
    contents: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        author: {
            type: String,
        },
        contents: {
            type: String,
            required: [true, "Blog content is required"],
        },
        tags: [String],
    },
    { timestamps: true },
);

export const Post = model<IPost>("Post", postSchema);
