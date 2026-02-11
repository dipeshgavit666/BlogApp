import { MongoMemoryServer } from "mongodb-memory-server";

declare global {
    var __MONGOINSTANCE: MongoMemoryServer;
}

export default async function globalSetup() {
    const instance = await MongoMemoryServer.create();
    global.__MONGOINSTANCE = instance;
    process.env.DATABASE_URL = instance.getUri();
}
