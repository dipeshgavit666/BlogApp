import { createServer } from "node:http";
// import { MongoClient } from "mongodb";
import { Post } from "./db/models/post.js";
import { initDatabase } from "./db/init.js";
// const url = "mongodb://localhost:27017/";
// const dbName = "ch2";
// const client = new MongoClient(url);
try {
    await initDatabase();
    const post = new Post({
        title: "Hello Mongoose!",
        author: "Dipesh Gavit",
        contents: "This post will be stored in MongoDB databse using Mongoose",
        tags: ["mongodb", "mongoose"],
    });
    await post.save();
    const posts = await Post.find();
    console.log(posts);
    const server = createServer(async (req, res) => {
        // const db = client.db(dbName);
        // const users = db.collection("users");
        // const usersList = await users.find().toArray();
        req.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        // res.end(JSON.stringify(usersList));
    });
    const host = "localhost";
    const port = 3000;
    server.listen(port, host, () => {
        console.log(`Server listening on http://${host}:${port}`);
    });
}
catch (err) {
    console.error(`error connecting to database: ${err}`);
}
