import { Schema, model } from "mongoose";
const postSchema = new Schema({
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
}, { timestamps: true });
export const Post = model("Post", postSchema);
